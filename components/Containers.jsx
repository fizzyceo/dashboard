import React, { useEffect, useState } from 'react';
import {  BsThreeDotsVertical } from 'react-icons/bs';
import {FiTrash} from 'react-icons/fi'
import {AiOutlineContainer } from 'react-icons/ai';
import {TbSquareRoundedPlusFilled} from 'react-icons/tb'
import InfoModel from './InfoModel'
import supabase from '../utils/SupabaseCli';
import AddingContainerModel from '../components/AddingContainerModel';
import DeleteModel from './DeleteModel';
import { useRouter } from 'next/router';
const Containers = () => {
    const [showContainerModel, setshowContainerModel] = useState(false);
    const [showAddContainer, setshowAddContainer] = useState(false);
    const [showDeleteContainer, setshowDeleteContainer] = useState(false);
    const [containers,setContainers] = useState([])
    const [chosenContainer,setChosenContainer] = useState({})
    const [chosenOwnerID,setchosenOwnerID] = useState("")
    
    const router = useRouter()
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

        if(data.user){
        console.log(data);
        const extractName = await supabase.from("user").select("first_name").eq("email",data.user.email)
        setEmail(extractName.data[0].first_name)
            
        }else{
          
          router.push('/')
        }
    }


useEffect(()=>{
    generateContainers();
    generateUser();
},[])

const get_container_id =async ()=>{
  console.log("in");
  const res = await fetch('../api/getContainers_id', {
    method: "POST",
    body: JSON.stringify({ 
        image_url:"../../backend/0013.jpg"
     }),
  });

const data = await res.json()
if(data){
console.log(data);
}
}
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
    <div className='bg-[#14142B]  min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Containers</h2>
        <h2>Welcome Back, {email}</h2>
      </div>
      <div className='flex flex-row justify-start items-center gap-2'>
        <p  className='p-4 underline-offset-4 underline'>List of Containers</p>
        <button onClick={AddContainer} className='cursor-pointer -top-2 font-semibold flex flex-row items-center justify-center bg-palet-dark-blue    rounded-md p-2 '><p>Create</p> <TbSquareRoundedPlusFilled className='w-7'/> </button>
      </div>
      <div className='p-4 relative'>
        
        
        
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
                        <div className='bg-palet-blue bg-opacity-25 p-3 rounded-lg'>

                            <AiOutlineContainer className='text-palet-dark-blue' />
                        </div>
                        <p className='pl-4'>{container.containerID}</p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>{container.ownerID}</p>
                    <p className={`hidden md:flex w-fit text-white rounded-md p-2 ${container.valid ? "bg-palet-blue":"bg-red-400"}`}>{container.valid ? "Yes":"No" }</p>
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
              <button onClick={get_container_id} className='bg-white text-black px-3 py-2 rounded-md'>Test Prediction</button>
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