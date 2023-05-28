import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../utils/SupabaseCli';


const UserInfoModel = ({ isvisible, onClose,container}) => {
  const [error, setError] = useState('');
  
  
  
  
  
 
  const saveChanges = async () => {
    // const {data,error} = await supabase.from("zones").update({
      
    //   width:Width,
    //   height:Height,
    //   nombre_lob:nombre_lob
    // }).eq("id",zone.id)
    if(error){ 
      setError(error.message)
      throw error.message
    }
    onClose()
    
    
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
        <div className="bg-white flex flex-col gap-5 p-10 rounded-md">
          <h1 className="text-center highdisplay text-black font-bold text-lg">
            Location Informations 
          </h1>
 
          <p>{error}</p>
          
          <div className="flex items-center flex-col gap-4  justify-between  technor w-full">
            <input type="text" className='p-2 rounded-md focus:outline-none ' placeholder='Current Zone' />
            <input type="text" className='p-2 rounded-md focus:outline-none'  placeholder='Current Lob' />
            
          </div>
          
            
        </div>
      </div>
    </div>
  );
};

export default UserInfoModel;
