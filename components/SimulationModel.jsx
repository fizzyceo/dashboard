
import React, { useEffect } from 'react';
import { useState } from 'react';
import Loading from './Loading'
const SimulationModel = ({ isvisible, onClose,ContainersCoordinates }) => {
  const [error, setError] = useState('');
  
   const [loadingsave, setLoadingsave] = useState(true);
  // useEffect(()=>{
  //   if(ContainersCoordinates.length>0){
  //     setLoadingsave(false)
  //   }else{
  //     setLoadingsave(true);
  //   }
  // },[ContainersCoordinates])

  // useEffect(()=>{
  //   const simulate = async()=>{
  //       setLoadingsave(true)    
  //       const res2 = await fetch('../api/sentToServer',{
  //       method: "GET"
  //     })
  //     const res2data = await res2.json();
  //     console.log(res2data);
      
  //     setLoadingsave(false)
  //   }

  //   simulate()
    
  // },[])

  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };

  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25 z-20  backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[600px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center highdisplay text-black font-bold text-lg">
           Simulation
          </h1>
        {loadingsave ? (
            <>
          <p className='font-semibold text-red-800 text-center'>{error}</p>
          <div className='text-black'>
            Containers with changed locations
            {ContainersCoordinates.map(cnt=>(
              <p key={cnt.Latitude}>Container ID: <span className='font-bold text-palet-green '>{cnt.container_id}</span> owner: <span className='font-bold text-palet-green '>{cnt.owner_id}</span>, lat: <span className='font-bold text-palet-green '>{cnt.Latitude}</span>, longitude: <span className='font-bold text-palet-green '>{cnt.Longitude}</span> </p>
            ))}
            
            <p className='italic font-bold opacity-60 text-sm text-center mt-5'>The above informations are automatically stored and updated in the database </p>
          </div>
            </>
        ):(
            <>
            <Loading/>
            </>
        )}
          


           
          
     
        </div>
      </div>
    </div>
  );
};

export default SimulationModel;
