
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../../utils/SupabaseCli';
import Loading from '../Loading';

const LobInfoModel = ({ isvisible, onClose, lob,generateLobs }) => {
  const [error, setError] = useState('');
  
  const [lob_num, setlob_num] = useState("");
  const [Width, setWidth] = useState(0.0);
  const [Height, setHeight] = useState(0.0);
  const [park, setpark] = useState(0);
  const [loadingsave, setLoadingsave] = useState(false);
  
  
 
 useEffect(()=>{
  setlob_num(lob.lob_num)
  setWidth(lob.width)
  setHeight(lob.height)
  setpark(lob.park)
  
 },[lob])
  const saveChanges = async () => {
    setLoadingsave(true);
    const {data,error} = await supabase.from("lob").update({
      lob_num:lob_num,
      width:Width,
      height:Height,
      park:park
    }).eq("id",lob.id)
    if(error){ 
      setError(error.message)
      throw error.message
    }
    onClose()
    generateLobs()
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
            Lob INFORMATIONS 
          </h1>
 
          <p>{error}</p>
          
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="Lob">Width</label>
              <input
                type="text"
                value={Width}
                onChange={(e) => setWidth(e.target.value)}
                name="Width"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="your Widthr..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
            <label className="text-black" htmlFor="valid">lob_num </label>
            <input  className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md " value={lob_num} onChange={e=>setlob_num(e.target.value)}/>
        

      </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="content">First Name</label>
              <input
                type="text"
                value={Height}
                onChange={(e) => setHeight(e.target.value)}
                name="content"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="First Name..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="weight">Lob umber </label>
              <input
                type="text"
                value={park}
                onChange={(e) => setpark(e.target.value)}
                name="owner"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Last Name..."
              />
            </div>

            <button
              onClick={saveChanges}
              className="bg-violet-700 w-full bg-opacity-90 hover:bg-opacity-100 flex justify-center py-2 rounded-full text-white"
            >
              {loadingsave ? (
                <div className="w-7 h-7 rounded-full animate-ping  bg-white"></div>
              ) : (
                <p>Save Changes</p>
              )}
            </button>
          
            {loadingsave && (<Loading/>)}
        </div>
      </div>
    </div>
  );
};

export default LobInfoModel;
