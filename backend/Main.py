import socket
import time
import random
from localisation import localisation_trilateration,simulation
from httprequest import async_send_people
import asyncio
# import containers 
async def main():
    run_program = True
    # Run the functions in a loop
    # Create a socket object
    
    while run_program:
        # Call the simulation function with a random ID
        
        
        
        # for container in containers :
        x,y=simulation("xxxxxxxxxxxx")
        await async_send_people({"Longitude":x,"Latitude":y})
        # Wait for 5 seconds before running the loop again
        # user_input = input("Do you want to stop the program? (y/n)")
        # if user_input == "y":
        #     run_program = False
        time.sleep(1)
        # Set a flag to control the execution of the program





if __name__ == '__main__':
    asyncio.run(main())
