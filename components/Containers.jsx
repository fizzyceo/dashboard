import React, { useEffect, useState } from 'react';
import { BsPersonFill, BsThreeDotsVertical,BsPlus } from 'react-icons/bs';
import {FiTrash} from 'react-icons/fi'
import {AiOutlineContainer } from 'react-icons/ai';
import InfoModel from './InfoModel'
import supabase from '../utils/SupabaseCli';
import AddingContainerModel from '../components/AddingContainerModel';
import DeleteModel from './DeleteModel';

const Containers = () => {
    const [showContainerModel, setshowContainerModel] = useState(false);
    const [showAddContainer, setshowAddContainer] = useState(false);
    const [showDeleteContainer, setshowDeleteContainer] = useState(false);
    const [containers,setContainers] = useState([])
    const [chosenContainer,setChosenContainer] = useState({})
    const [chosenOwnerID,setchosenOwnerID] = useState("")
    
    const [email,setEmail] = useState('')
    const generateContainers = async()=>{
        const res = await fetch('../api/getContainers', {
            method: "GET",
            
          });
        
        const data = await res.json()
        if(data){
        console.log(data);
        setContainers(data.containers)
            
        }
    }

    
    const generateUser = async()=>{
        const {data,error} = await supabase.auth.getUser()

        if(data){
        console.log(data);
        const extractName = await supabase.from("user").select("first_name").eq("email",data.user.email)
        setEmail(extractName.data[0].first_name)
            
        }
    }


useEffect(()=>{
    generateContainers();
    generateUser();
},[])

const init_model = (container)=>{
    setChosenContainer(container)
    setshowContainerModel((model) => !model)

}
const AddContainer=()=>{
    setshowAddContainer((model)=>!model)
}
const DeleteContainer = (containerID,ownerID)=>{
  setshowDeleteContainer((model)=>!model)
  setChosenContainer(containerID)
  setchosenOwnerID(ownerID)
}
  return (
    <div className='bg-gradient-to-b from-violet-600 to-blue-900 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Containers</h2>
        <h2>Welcome Back, {email}</h2>
      </div>
      <div className='p-4 relative'>
        
        <button onClick={AddContainer} className='absolute left-[50%] transform translate-x-[-50%] cursor-pointer -top-2 font-semibold flex flex-row items-center justify-center bg-purple-500 rounded-full p-4'><p>Create</p> <BsPlus className='w-7'/> </button>
        
        <div className='w-full m-auto p-4 border rounded-lg bg-white text-black overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Container ID</span>
            <span className='sm:text-left text-right'>Owner ID</span>
            <span className='hidden md:grid'>Validated</span>
            <span className='hidden sm:grid'>Content</span>
            
          </div>
          <ul>
            {containers && containers.map((container, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-purple-100 p-3 rounded-lg'>

                            <AiOutlineContainer className='text-purple-800' />
                        </div>
                        <p className='pl-4'>{container.containerID}</p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>{container.ownerID}</p>
                    <p className={`hidden md:flex w-fit text-white rounded-md p-2 ${container.valid ? "bg-purple-800":"bg-red-500"}`}>{container.valid ? "Yes":"No" }</p>
                    <div className='sm:flex hidden justify-between items-center'>
                        <p>{container.content}</p>
                        <div className='flex gap-3'>
                        <button className='hover:bg-red-500 transition-all p-2  rounded-lg bg-red-300 hover:text-white' onClick={()=>DeleteContainer(container.containerID)}>
                        <FiTrash className='hover:text-white'/>
                        </button>
                        <button onClick={() => init_model(container)}>
                        <BsThreeDotsVertical />
                        </button>
                        
                        </div>
                    </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
      <section className='w-[95%] h-[450px] mx-auto mb-10 bg-black '>

      </section>
      <InfoModel
        onClose={() => setshowContainerModel(false)}
        isvisible={showContainerModel}
        container={chosenContainer}
      />
      <AddingContainerModel
      onClose={() => setshowAddContainer(false)}
      isvisible={showAddContainer}
      generateContainers= {generateContainers}
   
      />
      <DeleteModel
      onClose={() => setshowDeleteContainer(false)}
      isvisible={showDeleteContainer}
      generateContainers= {generateContainers}
      containerID={chosenContainer}
      ownerID= {chosenOwnerID}
   
      />
    </div>
  );
};

export default Containers;