from flask import Flask, request
import time
import random

from localisation import localisation_trilateration,simulation

from httprequest import async_send_people

app = Flask(__name__)

@app.route('/Receiver', methods=['POST'])
async def  Receiver():
    print("we are in the function ")
    data = request.get_json()
    print("Testttttt555")
    containers = data['containers']
    print(containers[0])
    PreparetedData = []
    for container in containers:
        print(container['containerID'])
        x,y=simulation(container['containerID'])
        print(x,y)
        #store in a database inforrmation 
        # await async_send_people({"container_id":container['containerID'],"owner_id":container['ownerID'],"Longitude":x,"Latitude":y}) #sent coordinates with containers ID and ocwner ID to store in the database
        # time.sleep(random.randint(0,2))
        PreparetedData.append({"container_id":container['containerID'],"owner_id":container['ownerID'],"Longitude":x,"Latitude":y})
    return  PreparetedData

if __name__ == '__main__':
    app.run(port=5000)
