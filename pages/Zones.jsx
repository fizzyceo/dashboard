import React, { useEffect, useState } from 'react';
import { BsPersonFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import {MdOutlinePlace} from "react-icons/md"

import supabase from '../utils/SupabaseCli';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';
import { FiTrash } from 'react-icons/fi';

import DeleteModel from '../components/DeleteModel';

import AddingZoneModel from '../components/Zones/AddingZoneModel';
import ZoneInfoModel from '../components/Zones/ZoneInfoModel';
import { TbSquareRoundedPlusFilled } from 'react-icons/tb';
//FINISH THIS //////////////////////////////////////////////////////////////////////////////////////////////////
//ajouter des boutons pour les Creation - Deletion ///////////////////////////////////////////////////////////// 
// fix the login UI ////////////////////////////////////////////////////////////////////////////////////////////
const Zones = () => {
    const [showZoneModel, setshowZoneModel] = useState(false);
    const [showAddZone, setshowAddZone] = useState(false);
    const [showDeleteModel, setshowDeleteModel] = useState(false);
    const [Zones,setZones] = useState([])
    const [chosenZone,setChosenZone] = useState({})
    const [first_name,setfirst_name] = useState('')
    const [role, setRole] = useState('');
    const generateZones = async()=>{
        const res = await fetch('../api/getZones', {
            method: "GET",
            
          });
        
        const data = await res.json()
        if(data){
        console.log(data);
        setZones(data.Zones)
            
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
    generateZones();
    getUser();
},[])

const init_model = (zone)=>{
  setChosenZone(zone)
    setshowZoneModel((model) => !model)

}
const DeleteZone = (zoneid)=>{
  setshowDeleteModel((model)=>!model)
  setChosenZone(zoneid)
  
}
const AddZone=()=>{
  setshowAddZone((model)=>!model)
}
  return (
    <div className='flex 
    '>
      {role==="admin"?<AdminSidebar role={role}/>: <Sidebar/>}

    
    <div className='bg-[#14142B] min-h-screen flex-grow'>
       
      <div className='flex justify-between p-4'>
        <h2>Zones</h2>
        <h2>Welcome Back, {first_name}</h2>
      </div>
      <div className='flex flex-row justify-start items-center gap-2'>
        <p  className='p-4 underline-offset-4 underline'>List of Zones</p>
        <button onClick={AddZone} className='cursor-pointer -top-2 font-semibold flex flex-row items-center justify-center bg-palet-dark-blue    rounded-md p-2 '><p>Create</p> <TbSquareRoundedPlusFilled className='w-7'/> </button>
      </div>
      <div className='relative p-4'>
        
        <div className='w-full m-auto p-4 border rounded-lg bg-white text-black overflow-y-auto'>
          <div className='my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Type</span>
            <span className='hidden lg:grid'>Width</span>
            <span className='hidden lg:grid'>Height</span>
            <span className='' >Lob number</span>
            
          </div>
          <ul>
            {Zones && Zones.map((zone, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-palet-blue bg-opacity-25 p-3 rounded-lg'>
                            <MdOutlinePlace className='text-palet-dark-blue' />
                        </div>
                        <p className='pl-4'>{zone.type}</p>
                    </div>
                    <p className='text-gray-600 hidden lg:flex '>{zone.height}</p>
                    <p className={`hidden lg:flex w-fit rounded-md p-2 `}>{zone.width }</p>

                    <div className='flex justify-between items-center'>
                    <p className={` flex w-fit rounded-md p-2`}>{ zone.nombre_lob}</p>
                        <div className='flex gap-3'>
                        <button className='hover:bg-red-500 transition-all p-2  rounded-lg bg-red-300 hover:text-white' onClick={()=>DeleteZone(zone.id)}>
                        <FiTrash className='hover:text-white'/>
                        </button>
                        <button onClick={() => init_model(zone)}>
                        <BsThreeDotsVertical />
                        </button>
                        
                        </div>
                    </div>
                    
                </li>
            ))}
          </ul>
        </div>
      </div>
      <ZoneInfoModel
        onClose={() => setshowZoneModel(false)}
        isvisible={showZoneModel}
        zone={chosenZone}
        generateZones={generateZones}
      />
      <DeleteModel 
        onClose={() => setshowDeleteModel(false)}
        isvisible={showDeleteModel}
        Zoneid={chosenZone}
        generateZones={generateZones}
      />
      <AddingZoneModel
           
           onClose={() => setshowAddZone(false)}
           isvisible={showAddZone}
           generateZones= {generateZones}
        
           />
    </div>
    </div>  );
};

export default Zones;