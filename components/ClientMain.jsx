import React, { useState } from 'react'
import Map from './Map'

const ClientMain = () => {
    const [containerId,setContainerId] = useState("") 
    const [ownerId,setOwnerId] = useState("") 
    const [loading,setLoading] = useState(false)
    const [longitude,setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const generateLocation = async()=>{
        const res = await fetch('../api/getLocation', {
            method: "POST",
            body: JSON.stringify({ 
                containerId,
                ownerId
             }),
          });
        
        const data = await res.json()
        if(data){
        console.log(data);
        
        setLatitude(data.latitude)
        setLongitude(data.longitude)
        }
    }
  return (
    <div className='flex justify-center gap-10 flex-col flex-grow bg-gradient-to-b from-violet-800 to-blue-900 items-center'>
        <div className='flex flex-row gap-5 justify-center items-center'>
            <input type="text" placeholder='Container ID...' value={containerId} className='rounded-md p-3' onChange={e=> setContainerId(e.target.value)}/>
            <input type="text" placeholder='Owner ID...' value={ownerId} className='rounded-md p-3' onChange={e=> setOwnerId(e.target.value)}/>
            
            <button onClick={generateLocation} className='flex flex-row justify-center items-center gap-3 bg-green-400 bg-opacity-50 hover:bg-opacity-100 transition-all rounded-lg px-5 py-3'>
            <img src="/location.png" alt="" className='w-7 h-7'/>
                <p>Search</p>
            
            </button>
        </div>
        <Map longitude={longitude} latitude={latitude}/>
    </div>
  )
}

export default ClientMain