import Link from 'next/link';
import { useState } from 'react';
import supabase from '../utils/SupabaseCli';
import { Router, useRouter } from 'next/router';

export default function Sidebar({role}) {
  const [toggle,setToggal] = useState(false)
  const router = useRouter()
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error signing out:', error.message)
    else router.push('/')
  }
  return (

  <div className={`h-full flex flex-col transition-all ${toggle ? 'w-60 ': 'w-12'}`}>
    <div className='flex-grow flex flex-col relative  '>
      
      <button className='absolute top-[50%] transform translate-y-[-50%] -right-6 mr-1' onClick={()=>setToggal(!toggle)}>
        <img src="/arrowright.png" className={`${toggle ? "rotate-180" : "rotate-0"} transition-all duration-500`} width={28} alt="" />
         </button>
         <div className='item my-10 flex justify-center  items-center'>
           <img src="/logo.png" alt="" className='w-32 invert' /> 
           
        
        </div>
      <div className={`flex flex-col flex-grow bg-slate-800 border-t-2 border-b-2 border-white   py-5 gap-5 ${toggle ? 'items-start px-3' : "items-center"}`}>

      <a href={`${role==='admin'? "/Dashboard" :"/Client"}`} className='item flex flex-row gap-3 cursor-pointer items-center bg-green-400 bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
           <img src="/home.png" alt="" className='w-7 ' /> 
           <p className={`${!toggle && "hidden"} technor font-bold`}>Home</p>
        
        </a>
      
      <a href='/Profile' className='item flex flex-row gap-3  items-center bg-green-400 cursor-pointer bg-opacity-0 hover:bg-opacity-100 transition-all w-[90%] rounded-md p-2'>
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
{/* <div
className={`fixed inset-y-0 left-0 z-20 w-64 transition-all duration-300 ease-in-out bg-gray-900 text-white px-8 py-4 ${
  isSidebarOpen ? 'ml-0' : '-ml-64'
}`}
>
<button
  className="absolute top-0 right-0 mt-2 mr-2 text-white block  focus:outline-none z-30"
  onClick={toggleSidebar}
>
<svg
className={`fill-current h-8 w-8 `}
viewBox="0 0 24 24"
>
<path
d="M6 18L18 6M6 6l12 12"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
/>
</svg>

</button>
<div className="flex flex-col gap-14  h-full max-w-xs">
  <h2 className="text-2xl font-bold my-4">LOGO</h2>
  <nav>
    <ul>
      <li className="my-2">
        
          <a className="text-gray-300 hover:text-white">Home</a>
        
      </li>
      <li className="my-2">
        
          <a className="text-gray-300 hover:text-white">About</a>
        
      </li>
      <li className="my-2">
        
          <a className="text-gray-300 hover:text-white">Contact</a>
        
      </li>
    </ul>
  </nav>
</div>
</div> */}