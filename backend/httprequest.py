import asyncio
import aiohttp

import json


async def async_send_people(identified_containers):
    SERVER_URL = 'http://localhost:3000'
    """summary
        send HTTP request to the server 
    Args:
        identified_containers (type): people to send :  [
            {
                'first_name':<FIRST_NAME>, 
                'last_name':<LAST_NAME>,
                'time':<TIME>
            }
        ]
    """
    """"""
    data = {"identified_containers": identified_containers}


    # Converting to JSON 
    
    try :
        async with aiohttp.ClientSession() as session:
            encoded_data = json.dumps(data).encode('utf-8')
            headers = {
                'Content-Type': 'application/json'
                
            }
            
            async with session.put(SERVER_URL+'/api/getContainers_id', data=encoded_data, headers=headers) as response:
                print("Started now sending ")
                response_json = await response.json()
              
    except Exception as e  :
        print(e)




async def main():
    await async_send_people("identified_containers -- TestContainer")

asyncio.run(main())
