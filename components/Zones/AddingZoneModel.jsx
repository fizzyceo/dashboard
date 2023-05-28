
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../../utils/SupabaseCli';
import Loading from '../Loading';

const AddingZoneModel = ({ isvisible, onClose, generateZones }) => {
  const [error, setError] = useState('');
  const [role, setrole] = useState(false);
  const [type, setType] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [nombre_lob, setnombre_lob] = useState("");
  const [loadingsave, setLoadingsave] = useState(false);
  
  

  const Insert = async () => {
    
    setLoadingsave(true);
    if(width && height && type && nombre_lob){
        console.log("in");
    const {data,error} = await supabase.from("zones").insert({
      
      width:width,
      type:type,
      height:height,
      nombre_lob:nombre_lob
    })
    if(error){ 
      setError(error.message)
      setLoadingsave(false)
      throw error.message
    }
    onClose()
    generateZones()

}
    setLoadingsave(false);
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
      <div className="w-[500px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center highdisplay text-black font-bold text-lg">
           ADD Zone INFORMATIONS
          </h1>
 
          <p className='font-semibold text-red-800 text-center'>{error}</p>
          <div className="flex items-center justify-between  gap-3 w-full">
            <label className="text-black" htmlFor="valid">Type </label>
            <select  className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md flex justify-center items-center " id="valid" value={type} onChange={e=>setType(e.target.value)}>
        
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>

      </select>
      </div>
          
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="Zone">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                name="Width"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="your Width..."
              />
            </div>
            
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="content">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                name="content"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Height..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="weight">lobs </label>
              <input
                type="number"
                value={nombre_lob}
                onChange={(e) => setnombre_lob(e.target.value)}
                name="owner"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="nombre of lobs..."
              />
            </div>

            <button
              onClick={Insert}
              className="bg-palet-dark-blue bg-opacity-90  w-full  hover:bg-opacity-100 flex justify-center py-2 rounded-full text-white"
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

export default AddingZoneModel;
