import React, { useState } from 'react'
import Map from './Map'

const ClientMain = () => {
    const [containerId,setContainerId] = useState("") 
    const [ownerId,setOwnerId] = useState("") 
  return (
    <div className='flex justify-center gap-10 flex-col flex-grow bg-gradient-to-b from-violet-800 to-blue-900 items-center'>
        <div className='flex flex-row gap-5 justify-center items-center'>
            <input type="text" placeholder='Container ID...' value={containerId} className='rounded-md p-3' onChange={e=> setContainerId(e.target.value)}/>
            <input type="text" placeholder='Owner ID...' value={ownerId} className='rounded-md p-3' onChange={e=> setOwnerId(e.target.value)}/>
            
            <button className='flex flex-row justify-center items-center gap-3 bg-green-400 bg-opacity-50 hover:bg-opacity-100 transition-all rounded-lg px-5 py-3'>
            <img src="/location.png" alt="" className='w-7 h-7'/>
                <p>Search</p>
            
            </button>
        </div>
        <Map/>
    </div>
  )
}

export default ClientMain