import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsPersonFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import {AiOutlineUser } from 'react-icons/ai';
import InfoModel from '../components/InfoModel'
import supabase from '../utils/SupabaseCli';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';
import { FiTrash } from 'react-icons/fi';
import UserInfoModel from '../components/UserInfoModel';
import DeleteModel from '../components/DeleteModel';
import AddingUserModel from '../components/AddingUserModel'
//FINISH THIS //////////////////////////////////////////////////////////////////////////////////////////////////
//ajouter des boutons pour les Creation - Deletion ///////////////////////////////////////////////////////////// 
// fix the login UI ////////////////////////////////////////////////////////////////////////////////////////////
const Users = () => {
    const [showUserModel, setshowUserModel] = useState(false);
    const [showAddUser, setshowAddUser] = useState(false);
    const [showDeleteModel, setshowDeleteModel] = useState(false);
    const [Users,setUsers] = useState([])
    const [chosenUser,setChosenUser] = useState({})
    const [first_name,setfirst_name] = useState('')
    const [role, setRole] = useState('');
    const router = useRouter()
    const generateUsers = async()=>{
        const res = await fetch('../api/getUsers', {
            method: "GET",
            
          });
        
        const data = await res.json()
        if(data){
        console.log(data);
        setUsers(data.Users)
            
        }
    }

    
    const getUser = async()=>{
        const {data,error} = await supabase.auth.getUser()

        if(data.user){
        console.log(data);
        const extractedInfos = await supabase.from("user").select("*").eq("email",data.user.email)
        setfirst_name(extractedInfos.data[0].first_name)
        setRole(extractedInfos.data[0].admin ? "admin":"regular")
        
            
        }else{
          
          router.push("/")
        }
    }


useEffect(()=>{
    generateUsers();
    getUser();
},[])

const init_model = (user)=>{
  setChosenUser(user)
    setshowUserModel((model) => !model)

}
const DeleteUser = (userid)=>{
  setshowDeleteModel((model)=>!model)
  setChosenUser(userid)
  
}
const AddUser=()=>{
  setshowAddUser((model)=>!model)
}
  return (
    <div className='flex 
    '>
      {role==="admin"?<AdminSidebar role={role}/>: <Sidebar/>}

    
    <div className='bg-gradient-to-b from-violet-600 to-blue-900 min-h-screen flex-grow'>
       
      <div className='flex justify-between p-4'>
        <h2>Users</h2>
        <h2>Welcome Back, {first_name}</h2>
      </div>

      <div className='relative p-4'>
        <button onClick={AddUser} className='absolute left-[50%] transform translate-x-[-50%] cursor-pointer -top-2 font-semibold flex flex-row items-center justify-center bg-purple-500 rounded-full p-4'><p>Create</p> <BsPlus className='w-7'/> </button>
        <div className='w-full m-auto p-4 border rounded-lg bg-white text-black overflow-y-auto'>
          <div className='my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
            <span>email</span>
            <span className='hidden lg:grid'>first Name</span>
            <span className='hidden lg:grid'>Last Name</span>
            <span className='' >Role</span>
            
          </div>
          <ul>
            {Users && Users.map((user, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid  lg:grid-cols-4  grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-purple-100 p-3 rounded-lg'>
                            <AiOutlineUser className='text-purple-800' />
                        </div>
                        <p className='pl-4'>{user.email}</p>
                    </div>
                    <p className='text-gray-600 hidden lg:flex '>{user.first_name}</p>
                    <p className={`hidden lg:flex w-fit rounded-md p-2 `}>{user.last_name }</p>

                    <div className='flex justify-between items-center'>
                    <p className={` ${user.admin ? "bg-purple-800":"bg-red-500"} flex w-fit text-white rounded-md p-2`}>{user.admin ? "admin": "agent"}</p>
                        <div className='flex gap-3'>
                        <button className='hover:bg-red-500 transition-all p-2  rounded-lg bg-red-300 hover:text-white' onClick={()=>DeleteUser(user.id)}>
                        <FiTrash className='hover:text-white'/>
                        </button>
                        <button onClick={() => init_model(user)}>
                        <BsThreeDotsVertical />
                        </button>
                        
                        </div>
                    </div>
                    
                </li>
            ))}
          </ul>
        </div>
      </div>
      <UserInfoModel
        onClose={() => setshowUserModel(false)}
        isvisible={showUserModel}
        user={chosenUser}
        generateUsers={generateUsers}
      />
      <DeleteModel 
        onClose={() => setshowDeleteModel(false)}
        isvisible={showDeleteModel}
        userid={chosenUser}
        generateUsers={generateUsers}
      />
      <AddingUserModel
           
           onClose={() => setshowAddUser(false)}
           isvisible={showAddUser}
           generateUsers= {generateUsers}
        
           />
    </div>
    </div>  );
};

export default Users;