import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import SimulationModel from '../components/SimulationModel';
import Loading from '../components/Loading';
import AdminSidebar from '../components/AdminSidebar';

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
    const [showSimulationModel,setshowSimulationModel] = useState(false)
    const [returnedCoordinates,setReturnedCoordinates] = useState([])
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
        console.log(containerPos);
        }
    }

    const startingServer= async()=>{
      
       setLoading(true)    
        const res2 = await fetch('../api/sentToServer',{
        method: "GET"
      })
      const res2data = await res2.json();
      console.log(res2data);
      setReturnedCoordinates(res2data.coordinatesData)  
      
    
      setshowSimulationModel(model=>!model)
      setLoading(false)
      // const res2 = await fetch('../api/sentToServer',{
      //   method: "GET"
      // })
      // const res2data = await res2.json();
      // console.log(res2data);
    }

   
    useEffect(()=>{
      setAppear(true)
    },[])
  return (
    <div className="flex flex-row min-h-screen w-screen overflow-x-hidden ">
          <AdminSidebar role={"admin"}/>

   
    
    <div className='flex justify-center gap-10 flex-col flex-grow bg-[#14142B] items-center p-5'>
        <div className='w-full mx-2 flex justify-between items-center'>
        <h1>Localize your Container!</h1>
        <button onClick={startingServer} className='bg-palet-dark-blue p-2 mr-2 rounded-md'>Start Simulation</button>
        </div>
        <div className='flex flex-row gap-5 justify-center items-center'>
            <input type="text" placeholder='Container ID...' value={containerId} className='rounded-md p-3' onChange={e=> setContainerId(e.target.value)}/>
            <input type="text" placeholder='Owner ID...' value={ownerId} className='rounded-md p-3' onChange={e=> setOwnerId(e.target.value)}/>
            
            <button onClick={generateLocation} className='flex flex-row justify-center items-center gap-3 bg-palet-green bg-opacity-50 hover:bg-opacity-100 transition-all rounded-lg px-5 py-3'>
            <img src="/location.png" alt="" className='w-7 h-7'/>
                <p>Search</p>
            
            </button>
        </div>
        
        
        <div className='flex flex-row w-[80%] justify-center items-center '>
        <CopyMapdynamic showSimulationModel={loading || showSimulationModel } containerPosition={containerPos}/> 
        
        
        </div>
    {loading && <Loading/>}
        <SimulationModel
        onClose={() => setshowSimulationModel(false)}
        isvisible={showSimulationModel}
        ContainersCoordinates={returnedCoordinates}
        
      />
    </div>
    </div>
  )
}

export default Localize