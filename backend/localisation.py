import random


def normalize_coordinates(cord):
    # Initialize variables to hold min and max values
    xmin = float('inf')
    xmax = float('-inf')
    ymin = float('inf')
    ymax = float('-inf')

    # Find the minimum and maximum values of x and y
    for coords in cord.values():
        x_min, x_max, y_min, y_max = coords
        xmin = min(xmin, x_min)
        xmax = max(xmax, x_max)
        ymin = min(ymin, y_min)
        ymax = max(ymax, y_max)

    # Calculate the desired gap
    x_gap = max((xmax - xmin + 4), 3)
    y_gap = max((ymax - ymin + 4), 3)

    # Normalize the coordinates
    normalized_cord = {}
    for key, coords in cord.items():
        x_min, x_max, y_min, y_max = coords
        normalized_x_min = xmin - (x_gap - (x_max - x_min)) / 2
        normalized_x_max = xmax + (x_gap - (x_max - x_min)) / 2
        normalized_y_min = ymin - (y_gap - (y_max - y_min)) / 2
        normalized_y_max = ymax + (y_gap - (y_max - y_min)) / 2
        normalized_cord[key] = [normalized_x_min, normalized_x_max, normalized_y_min, normalized_y_max]

    return normalized_cord


  
def denormalize_coordinates(x, y, cord):
        
    for coords in cord.values():
        x_min, x_max, y_min, y_max = coords
        x_denormalized =round((x_min + (x_max - x_min) * (x + 0.5)),6) 
        y_denormalized =round(( y_min + (y_max - y_min) * (y + 0.5)),6)
        return x_denormalized, y_denormalized


def localisation_trilateration(Cam_01,Cam_02,Cam_03):
  # Latitude, Longitude, distance:
  lat_Cam01,lng_Cam_01,d_Cam01 =round(Cam_01[0],6),round(Cam_01[1],6),round(Cam_01[2],6)
  lat_Cam02,lng_Cam_02,d_Cam02 =round(Cam_02[0],6),round(Cam_02[1],6),round(Cam_02[2],6)
  lat_Cam03,lng_Cam_03,d_Cam03 =round(Cam_03[0],6),round(Cam_03[1],6),round(Cam_03[2],6)
  d1,d2,d3 = d_Cam01,d_Cam02, d_Cam03
  # Create 2d tuple
  R1 = (lat_Cam01,lng_Cam_01)
  R2 = (lat_Cam02,lng_Cam_02)
  R3 = (lat_Cam03,lng_Cam_03)
  A =round(R1[0]**2 + R1[1]**2 - d1**2,6)
  B = round(R2[0]**2 + R2[1]**2 - d2**2,6)
  C =  round(R3[0]**2 + R3[1]**2 - d3**2,6)
  
  X32 = R3[0] - R2[0]
  X13 = R1[0] - R3[0]
  X21 = R2[0] - R1[0]

  Y32 = R3[1] - R2[1]
  Y13 = R1[1] - R3[1]
  Y21 = R2[1] - R1[1]

  x =round((A * Y32 + B * Y13 + C * Y21)/(2.0*(R1[0]*Y32 + R2[0]*Y13 + R3[0]*Y21)),6)
  y =round((A * X32 + B * X13 + C * X21)/(2.0*(R1[1]*X32 + R2[1]*X13 + R3[1]*X21)),6)
  # prompt the result
  return x,y



def simulation(ID):
  """Parking A: used in frist procudre when shipment arrived into the port dimension : 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  """Parking B: used in second procudre when containers in phase of validation <la douane> : 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  """Parking C: used in last procudre when containers is ready for livraison to the client: 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  cord = {
      'Parking_A': [41.356549, 41.355253, 2.167908, 2.171459],
      'Parking_B': [41.355682, 41.354385, 2.167316, 2.170813],
      'Parking_C': [41.353830, 41.352501, 2.166114, 2.169655]
  }

  Norm_cord = normalize_coordinates(cord)
  print("normalized CORD:", Norm_cord)
  parking_list = ['Parking_A', 'Parking_B', 'Parking_C']
  parking_ch =random.choice(parking_list)
  print("random value:", random.uniform(41.355253, 41.356549))
  print('###########Park:',parking_ch," ###########")
  Cam_01=[random.uniform(Norm_cord[parking_ch][0],Norm_cord[parking_ch][1]),random.uniform(Norm_cord[parking_ch][2],Norm_cord[parking_ch][-1]),random.uniform(1,3)]
  Cam_02=[random.uniform(Norm_cord[parking_ch][0],Norm_cord[parking_ch][1]),random.uniform(Norm_cord[parking_ch][2],Norm_cord[parking_ch][-1]),random.uniform(1,3)]
  Cam_03=[random.uniform(Norm_cord[parking_ch][0],Norm_cord[parking_ch][1]),random.uniform(Norm_cord[parking_ch][2],Norm_cord[parking_ch][-1]),random.uniform(1,3)]
  print("Cordination of Virtual Camera")
  print('[INFO].. Camera 01: ',Cam_01)
  print('[INFO].. Camera 02: ',Cam_02)
  print('[INFO].. Camera 03: ',Cam_03)
  x,y = localisation_trilateration(Cam_01,Cam_02,Cam_03)
  print("normalized x&y: ",x,y)
  x,y=denormalize_coordinates(x, y, cord)
  if(x>cord[parking_ch][1] or x<cord[parking_ch][0]):
    x =round(random.uniform(cord[parking_ch][0],cord[parking_ch][1]),6)

  if(y>cord[parking_ch][3] or y<cord[parking_ch][2]):
    y =round(random.uniform(cord[parking_ch][2],cord[parking_ch][3]),6)

  print('Containers_Localisation with ID: ',ID,' Latitude: ',x,', Longitude: ',y)
  return x,y

  




x,y=simulation("BF7680 09")
print(x,y)





# cord = {
#     'Parking_A': [41.356549, 41.355253, 2.167908, 2.171459],
#     'Parking_B': [41.355682, 41.354385, 2.167316, 2.170813],
#     'Parking_C': [41.353830, 41.352501, 2.166114, 2.169655]
# }

# normalized_cord = normalize_coordinates(cord)
# print(normalized_cord)



