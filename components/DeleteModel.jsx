
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase, { supabaseSecret } from '../utils/SupabaseCli';
import Loading from './Loading';

const DeleteModel = ({ isvisible, onClose, containerID ,ownerID,generateContainers,userid,generateUsers,Zoneid,generateZones,Lobid , generateLobs}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const Delete = async () => {
    setLoading(true);
    if(ownerID && containerID && generateContainers){
    const { data, error } = await supabase
      .from('container')
      .delete()
      .eq('containerID', containerID).eq("ownerID",ownerID);
    if (error) {
      setError(error.message);
      throw error.message;
    }
    generateContainers()
  }else if(userid && generateUsers){
    const res = await fetch('../api/DeleteUser', {
      method: "POST",
      body: JSON.stringify({ 
          userid,
          
       }),
    });
    if(res.status==400){
      console.log(res.error);
      setLoading(false)
    }
    generateUsers()
  }else if(Zoneid && generateZones){
    const { data, error } = await supabase
      .from('zones')
      .delete()
      .eq('id', Zoneid)
    if (error) {
      setError(error.message);
      throw error.message;
    }
    generateZones()
  }else if(Lobid && generateLobs){
    const { data, error } = await supabase
      .from('lob')
      .delete()
      .eq('id', Lobid)
    if (error) {
      setError(error.message);
      throw error.message;
    }
    generateLobs()
  }
    setLoading(false);
    onClose();
  };
  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };
useEffect(()=>{
  console.log(supabaseSecret);
},[])
  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25  backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[750px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center text-black font-semibold text-lg">
           Are you sure you want to delete this {userid && "user"} {containerID && "container"} {Zoneid && "Zone"} {Lobid && "Lob"}?
          </h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
  de naissance,
  numpere,
  nummere */}
          <p>{error}</p>
          <div className="flex flex-row gap-5 items-center justify-center ">
            <button
              onClick={Delete}
              className="bg-red-700 w-full py-2 rounded-full text-white"
            >
              {loading ? (
                <div className="w-7 h-7 rounded-full animate-ping bg-white"></div>
              ) : (
                <p>Confirm</p>
              )}
            </button>
            <button
              onClick={() => onClose()}
              className="bg-slate-500 w-full py-2 rounded-full text-white"
            >
              Cancel
            </button>
          </div>
        </div>
        {loading && (<Loading/>)}
      </div>
    </div>
  );
};

export default DeleteModel;
