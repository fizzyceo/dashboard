from flask import Flask, request

import random

from localisation import localisation_trilateration,simulation

from httprequest import async_send_people

app = Flask(__name__)

@app.route('/Receiver', methods=['POST'])
async def  Receiver():

    data = request.get_json()
    if 'container_id' not in data or not isinstance(data['container_id'], str):
        return 'Invalid or missing container_id', 400

    container_id = data['container_id']
    
    x,y=simulation(container_id)

    await async_send_people({"container_id":container_id,"Longitude":x,"Latitude":y})

    

    print(container_id)

    return 'Data received'

if __name__ == '__main__':
    app.run(port=5000)
