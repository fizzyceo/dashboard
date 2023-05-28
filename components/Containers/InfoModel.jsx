
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../../utils/SupabaseCli';
import LocationInfo from '../LocationInfo'
const InfoModel = ({ isvisible, onClose, container }) => {
  const [error, setError] = useState('');
  const [showLocation,setShowLocation] = useState(false)
  const [validated, setValidated] = useState(container.valid ? "TRUE": "FALSE");
  const [containerID, setcontainerID] = useState(container.containerID);
  const [ownerID, setownerID] = useState(container.ownerID);
  const [weight, setweight] = useState(container.weight);
  const [content, setContent] = useState(container.content);
  const [loadingsave, setLoadingsave] = useState(false);
  const [loadingmap, setLoadingmap] = useState(false);
  
 
 useEffect(()=>{
  setcontainerID(container.containerID)
  setownerID(container.ownerID)
  setweight(container.weight)
  setValidated(container.valid)
  setContent(container.content)
 },[container])
  const saveChanges = async () => {
    setLoadingsave(true);
    const {data,error} = await supabase.from("container").update({
      containerID:containerID,
      ownerID:ownerID,
      weight:weight,
      content:content
    }).eq("id",container.id)
    if(error){ 
      setError(error.message)
      throw error.message
    }
    setLoadingsave(false);
    //update table 
  };
  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };
  const LocateInMap = ()=>{
    setLoadingmap(true)
    setShowLocation((model)=>!model)
    setLoadingmap(false)
  }
  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25  backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[500px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center highdisplay text-black font-bold text-lg">
            CONTAINER INFORMATIONS 
          </h1>
 
          <p>{error}</p>
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="container">Container ID</label>
              <input
                type="text"
                value={containerID}
                onChange={(e) => setcontainerID(e.target.value)}
                name="container"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
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
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
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
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="weight">weight </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setweight(e.target.value)}
                name="owner"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
            <label className="text-black" htmlFor="valid">Validated </label>
      <select  className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md " id="valid" value={validated} onChange={setValidated}>
        
        <option value="TRUE">Yes</option>
        <option value="FALSE">No</option>

      </select>
            </div>
            <button
              onClick={saveChanges}
              className="bg-palet-dark-blue w-full bg-opacity-90 hover:bg-opacity-100 flex justify-center py-2 rounded-full text-white"
            >
              {loadingsave ? (
                <div className="w-7 h-7 rounded-full animate-ping  bg-white"></div>
              ) : (
                <p>Save Changes</p>
              )}
            </button>
          
          <div className='border-t-2 border-gray-200 py-3 flex flex-col gap-3 justify-center items-center'>
          <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="latitude">latitude </label>
              <input
                type="text"
                value={container.latitude}
                
                name="owner"
                className="w-[80%] py-2 px-2 border-2 cursor-not-allowed bg-gray-800  bg-opacity-60 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="weight">longitude </label>
              <input
                type="text"
                value={container.longitude}
                
                name="owner"
                className="w-[80%] py-2 px-2 border-2 bg-gray-800 cursor-not-allowed bg-opacity-60 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <button
              onClick={LocateInMap}
              className="bg-palet-green w-full bg-opacity-90 hover:bg-opacity-100 flex justify-center py-2 rounded-full text-white"
            >
              {loadingmap ? (
                  <div className="w-7 h-7 rounded-full animate-ping  bg-white"></div>
              ) : (
                <p>Locate on Map</p>
              )}
            </button>
          </div>
        </div>
      </div>
      <LocationInfo
        onClose={() => setShowLocation(false)}
        isvisible={showLocation}
        container={container}
      />
    </div>
  );
};

export default InfoModel;
