import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import AdminSidebar from '../components/AdminSidebar'

const  CopyMapdynamic= dynamic(() => import('../components/CopyMap'), {
  ssr: false
});

const Localize = () => {
    const [containerId,setContainerId] = useState("") 
    const [ownerId,setOwnerId] = useState("") 
    const [loading,setLoading] = useState(false)
    const [longitude,setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [containerPos,setContainerPos] = useState([])

    const [appear,setAppear] = useState(false)
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
        setContainerPos(pos=>[parseFloat(data.latitude),parseFloat(data.longitude)])

        }
    }
    useEffect(()=>{
      setAppear(true)
    },[])
  return (
    <div className="flex flex-row h-screen w-screen ">
    <AdminSidebar role={"admin"}/>
   
   
    <div className='flex justify-center gap-10 flex-col flex-grow bg-[#14142B] items-center'>
        <div className='flex flex-row gap-5 justify-center items-center'>
            <input type="text" placeholder='Container ID...' value={containerId} className='rounded-md p-3' onChange={e=> setContainerId(e.target.value)}/>
            <input type="text" placeholder='Owner ID...' value={ownerId} className='rounded-md p-3' onChange={e=> setOwnerId(e.target.value)}/>
            
            <button onClick={generateLocation} className='flex flex-row justify-center items-center gap-3 bg-palet-green bg-opacity-50 hover:bg-opacity-100 transition-all rounded-lg px-5 py-3'>
            <img src="/location.png" alt="" className='w-7 h-7'/>
                <p>Search</p>
            
            </button>
        </div>
        <div className='flex flex-row w-[80%] justify-center items-center '>
        {appear &&<CopyMapdynamic containerPosition={containerPos}/> }
        
        </div>
    </div>
    </div>
  )
}

export default Localize