import React, { useEffect, useState } from 'react';
import { BsPersonFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import {MdOutlinePlace} from "react-icons/md"

import supabase from '../utils/SupabaseCli';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';
import { FiTrash } from 'react-icons/fi';

import UserInfoModel from '../components/UserInfoModel';
import DeleteModel from '../components/DeleteModel';

import AddingZoneModel from '../components/AddingZoneModel';
import ZoneInfoModel from '../components/ZoneInfoModel';
import AddingLobModel from '../components/Lobs/AddingLobModel';
import LobInfoModel from '../components/Lobs/LobInfoModel';
import { GrAdd, GrLocationPin } from 'react-icons/gr';
//FINISH THIS //////////////////////////////////////////////////////////////////////////////////////////////////
//ajouter des boutons pour les Creation - Deletion ///////////////////////////////////////////////////////////// 
// fix the login UI ////////////////////////////////////////////////////////////////////////////////////////////
const Lobs = () => {
    const [showLob, setshowLob] = useState(false);
    const [showAddLob, setshowAddLob] = useState(false);
    const [showDeleteModel, setshowDeleteModel] = useState(false);
    const [Lobs,setLobs] = useState([])
    const [chosenLob,setChosenLob] = useState({})
    const [first_name,setfirst_name] = useState('')
    const [role, setRole] = useState('');
    const generateLobs = async()=>{
        const res = await fetch('../api/getLobs', {
            method: "GET",
            
          });
        
        const data = await res.json()
        if(data){
        console.log(data);
        setLobs(data.Lobs)
            
        }
    }

    
    const getUser = async()=>{
        const {data,error} = await supabase.auth.getUser()

        if(data){
        console.log(data);
        const extractedInfos = await supabase.from("user").select("*").eq("email",data.user.email)
        setfirst_name(extractedInfos.data[0].first_name)
        setRole(extractedInfos.data[0].admin ? "admin":"regular")
        
            
        }
    }


useEffect(()=>{
    generateLobs();
    getUser();
},[])

const init_model = (Lob)=>{
  setChosenLob(Lob)
    setshowLob((model) => !model)

}
const DeleteLob = (Lobid)=>{
  setshowDeleteModel((model)=>!model)
  setChosenLob(Lobid)
  
}
const AddLob=()=>{
  setshowAddLob((model)=>!model)
}
  return (
    <div className='flex 
    '>
      {role==="admin"?<AdminSidebar role={role}/>: <Sidebar/>}

    
    <div className='bg-gradient-to-b from-violet-600 to-blue-900 min-h-screen flex-grow'>
       
      <div className='flex justify-between p-4'>
        <h2>Lobs</h2>
        <h2>Welcome Back, {first_name}</h2>
      </div>

      <div className='relative p-4'>
        <button onClick={AddLob} className='absolute left-[50%] transform translate-x-[-50%] cursor-pointer -top-2 font-semibold flex flex-row items-center justify-center bg-purple-500 rounded-full p-4'><p>Create</p> <BsPlus className='w-7'/> </button>
        <div className='w-full m-auto p-4 border rounded-lg bg-white text-black overflow-y-auto'>
          <div className='my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Lob ID</span>
            <span className='hidden lg:grid'>Width</span>
            <span className='hidden lg:grid'>Height</span>
            <span className='' >Zone ID</span>
            
          </div>
          <ul>
            {Lobs && Lobs.map((Lob, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-purple-100 p-3 rounded-lg'>
                            <GrLocationPin className='text-purple-800' />
                        </div>
                        <p className='pl-4'>{Lob.lob_num}</p>
                    </div>
                    <p className='text-gray-600 hidden lg:flex '>{Lob.height}</p>
                    <p className={`hidden lg:flex w-fit rounded-md p-2 `}>{Lob.width }</p>

                    <div className='flex justify-between items-center'>
                    <p className={` flex w-fit rounded-md p-2`}>{ Lob.park}</p>
                        <div className='flex gap-3'>
                        <button className='hover:bg-red-500 transition-all p-2  rounded-lg bg-red-300 hover:text-white' onClick={()=>DeleteLob(Lob.id)}>
                        <FiTrash className='hover:text-white'/>
                        </button>
                        <button onClick={() => init_model(Lob)}>
                        <BsThreeDotsVertical />
                        </button>
                        
                        </div>
                    </div>
                    
                </li>
            ))}
          </ul>
        </div>
      </div>
      <LobInfoModel
        onClose={() => setshowLob(false)}
        isvisible={showLob}
        lob={chosenLob}
        generateLobs={generateLobs}
      />
      <DeleteModel 
        onClose={() => setshowDeleteModel(false)}
        isvisible={showDeleteModel}
        Lobid={chosenLob}
        generateLobs={generateLobs}
      />
      <AddingLobModel
           
           onClose={() => setshowAddLob(false)}
           isvisible={showAddLob}
           generateLobs= {generateLobs}
        
           />
    </div>
    </div>  );
};

export default Lobs;