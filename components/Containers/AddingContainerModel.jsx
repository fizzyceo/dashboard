
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../../utils/SupabaseCli';
import Loading from '../Loading'
const AddingModel = ({ isvisible, onClose,generateContainers }) => {
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(0);
  const [containerID, setcontainerID] = useState("");
  const [ownerID, setownerID] = useState("");
  const [weight, setweight] = useState(0.0);
  const [netweight, setNetWeight] = useState(0.0);
  const [maxweight, setMaxweight] = useState(0.0);
  const [content, setContent] = useState("");
  const [loadingsave, setLoadingsave] = useState(false);
  
  
 
  const AddContainer = async () => {
    if(containerID && ownerID && weight && content){

    
    setLoadingsave(true);
    const {data,error} = await supabase.from("container").insert({
      containerID:containerID,
      ownerID:ownerID,
      weight:weight,
      content:content,
      valid:validated
    })
    console.log(data);
    if(error){ 
      setError(error.message)
      throw error.message
    }
    generateContainers()
    setLoadingsave(false);
    onClose()
    
  }else{
    setError("fill in all of the informations above please")
  }
    //update table 
  };
  
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
      className="fixed flex inset-0 bg-black bg-opacity-25  backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[600px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
        <h1 className='text-black font-bold italic opacity-60 text-xl text-center'>Fill New Container's Informations</h1>

 
          <p className='text-center block text-red-800'>{error}</p>
          <div className='flex flex-col gap-4 w-[90%] mx-auto max-h-[90%]'>
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="container">Container ID</label>
              <input
                type="text"
                value={containerID}
                onChange={(e) => setcontainerID(e.target.value)}
                name="container"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Container ID..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="owner">owner ID</label>
              <input
                type="text"
                value={ownerID}
                onChange={(e) => setownerID(e.target.value)}
                name="owner"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="content">Content</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black  ' htmlFor="weight">weight </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setweight(e.target.value)}
                name="owner"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black  ' htmlFor="maxweight">Max Weight </label>
              <input
                type="text"
                value={maxweight}
                onChange={(e) => setMaxweight(e.target.value)}
                name="owner"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black  ' htmlFor="netweight">Net Weight </label>
              <input
                type="text"
                value={netweight}
                onChange={(e) => setNetWeight(e.target.value)}
                name="owner"
                className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
            <label className="text-black" htmlFor="valid">Validated </label>
      <select  className="w-[65%] py-2 px-2 border-2 border-slate-400 rounded-md " id="valid" value={validated} onChange={(e)=>{setValidated(e.target.value)
      }}>
        
        <option value="1">Yes</option>
        <option value="0">No</option>

      </select>
            </div>
            </div>
            <button
              onClick={AddContainer}
              className="bg-palet-green w-full bg-opacity-90 hover:bg-opacity-100 flex justify-center py-2 rounded-full text-white"
            >
              {loadingsave ? (
                <div className="w-7 h-7 rounded-full animate-ping  bg-white"></div>
              ) : (
                <p>Insert</p>
              )}
            </button>
          
            {loadingsave && (<Loading/>)}
        </div>
      </div>
    </div>
  );
};

export default AddingModel;
