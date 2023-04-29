
import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../utils/SupabaseCli';
import Loading from './Loading';

const UserInfoModel = ({ isvisible, onClose, user,generateUsers }) => {
  const [error, setError] = useState('');
  const [role, setrole] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [first_name, setfirst_name] = useState(user.first_name);
  const [last_name, setlast_name] = useState(user.last_name);
  const [loadingsave, setLoadingsave] = useState(false);
  
  
 
 useEffect(()=>{
  setEmail(user.email)
  setPassword(user.password)
  setfirst_name(user.first_name)
  setlast_name(user.last_name)
  setrole(user.admin)
 },[user])
  const saveChanges = async () => {
    setLoadingsave(true);
    const {data,error} = await supabase.from("user").update({
      admin:role,
      password:password,
      first_name:first_name,
      last_name:last_name
    }).eq("id",user.id)
    if(error){ 
      setError(error.message)
      throw error.message
    }
    onClose()
    generateUsers()
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
            user INFORMATIONS 
          </h1>
 
          <p>{error}</p>
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="user">Email</label>
              <input
                type="text"
                defaultValue={email}
                
               
                name="email"
                className="w-[80%] py-2 px-2 border-2 cursor-not-allowed bg-slate-400 border-slate-400 rounded-md "
                placeholder="email..."
              />
            </div>
          
          <div className="flex items-center justify-between  technor w-full">
              <label className='text-black' htmlFor="user">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="your Passwordr..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
            <label className="text-black" htmlFor="valid">Admin </label>
            <select  className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md " id="valid" value={role} onChange={e=>setrole(e.target.value)}>
        
        <option value="true">Yes</option>
        <option value="false">No</option>

      </select>
      </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="content">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                name="content"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="First Name..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label className='text-black' htmlFor="weight">Last Name </label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
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

export default UserInfoModel;
