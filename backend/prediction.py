import sys 
import glob
import os 
import cv2
import matplotlib.pyplot as plt
import easyocr
import numpy as np
# Constants.
INPUT_WIDTH = 640
INPUT_HEIGHT = 640
SCORE_THRESHOLD = 0.5
NMS_THRESHOLD = 0.45
CONFIDENCE_THRESHOLD = 0.45
 
# Text parameters.
FONT_FACE = cv2.FONT_HERSHEY_SIMPLEX
FONT_SCALE = 0.7
THICKNESS = 1
 
# Colors.
BLACK  = (0,0,0)
BLUE   = (255,178,50)
YELLOW = (0,255,255)

weight_path = "./best.onnx"
#loading model
def net_yolo():

    
    net = cv2.dnn.readNet(weight_path)
    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
    net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
    
    return net


def pre_process(input_image, net):
      # Create a 4D blob from a frame.
      blob = cv2.dnn.blobFromImage(input_image, 1/255,  (INPUT_WIDTH, INPUT_HEIGHT), [0,0,0], 1, crop=False)
 
      # Sets the input to the network.
      net.setInput(blob)
 
      # Run the forward pass to get output of the output layers.
      outputs = net.forward(net.getUnconnectedOutLayersNames())
      return outputs


def draw_label(im, label, x, y):
    """Draw text onto image at location."""
    # Get text size.
    text_size = cv2.getTextSize(label, FONT_FACE, FONT_SCALE, THICKNESS)
    dim, baseline = text_size[0], text_size[1]
    # Use text size to create a BLACK rectangle.
    cv2.rectangle(im, (x,y), (x + dim[0], y + dim[1] + baseline), (0,0,0), cv2.FILLED);
    # Display text inside the rectangle.
    cv2.putText(im, label, (x, y + dim[1]), FONT_FACE, FONT_SCALE, YELLOW, THICKNESS, cv2.LINE_AA)


def post_process(input_image, outputs):
      # Lists to hold respective values while unwrapping.
      class_ids = []
      confidences = []
      boxes = []
      copy_image = input_image.copy()
      # Rows.
      rows = outputs[0].shape[1]
      image_height, image_width = input_image.shape[:2]
      # Resizing factor.
      x_factor = image_width / INPUT_WIDTH
      y_factor =  image_height / INPUT_HEIGHT
      # Iterate through detections.
      for r in range(rows):
            row = outputs[0][0][r]
            confidence = row[4]
            # Discard bad detections and continue.
            if confidence >= CONFIDENCE_THRESHOLD:
                  classes_scores = row[5:]
                  # Get the index of max class score.
                  class_id = np.argmax(classes_scores)
                  #  Continue if the class score is above threshold.
                  if (classes_scores[class_id] > SCORE_THRESHOLD):
                        confidences.append(confidence)
                        class_ids.append(class_id)
                        cx, cy, w, h = row[0], row[1], row[2], row[3]
                        left = int((cx - w/2) * x_factor)
                        top = int((cy - h/2) * y_factor)
                        width = int(w * x_factor)
                        height = int(h * y_factor)
                        box = np.array([left, top, width, height])
                        boxes.append(box)
      #Perform non maximum suppression to eliminate redundant, overlapping boxes with lower confidences.
      indices = cv2.dnn.NMSBoxes(boxes, confidences, CONFIDENCE_THRESHOLD, NMS_THRESHOLD)
      for i in indices:
            box = boxes[i]
            left = box[0]
            top = box[1]
            width = box[2]
            height = box[3]    
            
                # Crop the image based on the box coordinates
            crop_img = input_image[top:top+height, left:left+width]

            # Save the cropped image
            cv2.imwrite(f'./cropped/cropped_image_{i}.jpg', crop_img)         
            # Draw bounding box.             
            cv2.rectangle(copy_image , (left, top), (left + width, top + height), BLUE, 3*THICKNESS)
            # Class label.                      
            label = "{}:{:.2f}".format(classes[class_ids[i]], confidences[i])             
            # Draw label.             
            draw_label(copy_image , label, left, top)
      cv2.imwrite('prediction.jpg', copy_image )
      return copy_image 

def imShow(path):
  
  #%matplotlib inline

  image = cv2.imread(path)
  height, width = image.shape[:2]
  resized_image = cv2.resize(image,(3*width, 3*height), interpolation = cv2.INTER_CUBIC)

  fig = plt.gcf()
  fig.set_size_inches(18, 10)
  plt.axis("off")
  #plt.rcParams['figure.figsize'] = [10, 5]
  plt.imshow(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))
  plt.show()


def extract_id(image):
  
# we need to crop the image to display only the container
# extract the texts written on the container
# extract the ID from the results
# store them in a dataframe

  reader = easyocr.Reader(['en'],gpu=True)
  results = reader.readtext(image)
  for row in results:
    cord = row[0]
    # Assuming bbox_list is a list of coordinates in the format [x1, y1, x2, y2]
    y_coords = [coord[1] for coord in cord]
    min_y = min(y_coords)
    # Assuming results is a list of rows and the minimum y-coordinate is stored in the variable min_y

  sorted_results = sorted(results, key=lambda row: min(coord[1] for coord in row[0]) if row[0] else float('inf'))
  first_two_results = sorted_results[:2]
 # Assuming the second element of each row is a string
  text = [row[1] for row in first_two_results]
  if(text):
    ids = text[0]
    split_text = ids.split(" ", 1)

    if len(split_text) > 1:
      owner_ID, container_ID = split_text
    else:
      owner_ID =text[0]
      container_ID = text[1]



    for text in first_two_results:
      cord = text[0]

      
      #extract les cordonnees de x et y [[x:595, y:611], [x:641, y:611], [x:641, y:623], [x:595, y:623]] min et max
      #sort the results output and retreive the text that has the max_x and min_y (BICU 123456  [7])
      x_min, y_min = [int(min(idx)) for idx in zip(*cord)]
      x_max, y_max = [int(max(idx)) for idx in zip(*cord)]
      
      cv2.rectangle(image,(x_min,y_min),(x_max,y_max),(0,0,255),2)
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    return owner_ID,container_ID
  else:
    return None,None



def iterate_cropped_images():
  folder_path = "./cropped"
  containers = []
  if not os.path.exists(folder_path):
    os.makedirs(folder_path)

  image_list = glob.glob(os.path.join(folder_path, "*"))
  for image_path in image_list:

    image = cv2.imread(image_path)
    owner_ID,container_ID=extract_id(image)
    #---------------------STORE ID AND CONTAINER ----------------
    print(owner_ID,"--",container_ID)
    container = {owner_ID, container_ID}
    containers.append(container)

  return containers
    #we check the database and overwrite its location to its  latest PLACE


# classes = ['containers']
# frame = './0013.jpg'
# image_url = sys.argv[1]
# input_image = cv2.imread(image_url)
# net = net_yolo()
# detections = pre_process(input_image, net)
# img = post_process(input_image.copy(), detections)
# imShow('prediction.jpg')
# identified_containers = iterate_cropped_images()
# print(identified_containers)

# Import other necessary modules and functions here

def main(image_url):
  classes = ['containers']
  frame = './0013.jpg'
  image_url = sys.argv[0]
  input_image = cv2.imread(image_url)
  net = net_yolo()
  detections = pre_process(input_image, net)
  img = post_process(input_image.copy(), detections)
  imShow('prediction.jpg')
  identified_containers = iterate_cropped_images()
  print(identified_containers)

if __name__ == '__main__':
  # Get the image URL from the command-line arguments
  image_url = sys.argv[1]

  # Call the main function with the image URL
  main(image_url)
