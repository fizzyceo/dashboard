import Link from 'next/link';
import { useState } from 'react';
import supabase from '../utils/SupabaseCli';
import {GrLocationPin} from 'react-icons/gr';

import { Router, useRouter } from 'next/router';

export default function Sidebar({role,setMenu}) {
  const [toggle,setToggal] = useState(false)
  const router = useRouter()
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error signing out:', error.message)
    else router.push('/')
  }
  return (

  <div className={`min-h-screen flex flex-col bg-[#24263A]  transition-all ${toggle ? 'toggled ': 'w-12'}`}>

    <div className='flex-grow flex flex-col relative  '>
      
      <button className='absolute top-[50%] translate-y-1/2  -right-4 mr-1' onClick={()=>setToggal(!toggle)}>
       
        <img src="/arrowright.png" className={`${toggle ? "rotate-180" : "rotate-0"} transition-all duration-500`} width={28} alt="" />
       
        </button>
       
        <div className='item my-10 flex justify-center  items-center'>

        <img src="/logo.png" alt="" className='w-32 invert' /> 

        </div>
      
      <div className={`flex flex-col flex-grow   border-t-2 border-b-2 border-white   py-5 gap-5 ${toggle ? 'items-start px-3' : "items-center"}`}>

      <a href={`${role==='admin'? "/Dashboard" :"/Client"}`} className='item flex flex-row gap-3 cursor-pointer items-center bg-palet-green bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/worldwide-shipping.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Containers</p>
        
        </a>
      <a href={`/Zones`} className='item flex flex-row gap-3 cursor-pointer items-center bg-palet-green bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/zone.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Port Zones</p>
        
        </a>
      <a href={`/Localize`} className='item flex flex-row gap-3 cursor-pointer items-center bg-palet-green bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
      <GrLocationPin className='invert w-7 h-7 '/>
           <p className={`${!toggle && "hidden"} technor font-bold`}>Localize</p>
        
        </a>
      <a href={`/Users`} className='item flex flex-row gap-3 cursor-pointer items-center bg-palet-green bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/group.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Users</p>
        
        </a>
      
      <a href='/Profile' className='item flex flex-row gap-3  items-center bg-palet-green cursor-pointer bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/user.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Profile</p>
        
        </a>
      
      </div>
    </div>

    <footer className='py-5 flex  items-center justify-center   '>
    <button onClick={signOutUser } className='item flex flex-row gap-3  items-center bg-red-400 bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/sign-out.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Logout</p>
        
        </button>
    </footer>
    <p className='h-[10%]'></p>
  </div>
  );
}