from flask import Flask, request

app = Flask(__name__)

@app.route('/Receiver', methods=['POST'])
def Receiver():
    data = request.get_json()
    container_id = data['container_id']
    containers = data['containers']
    #update old containers with new containers
    
    # Do something with the container_id data
    print(container_id)
    return 'Data received'

if __name__ == '__main__':
    app.run(port=5000)
