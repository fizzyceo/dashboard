
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';

import supabase from '../utils/SupabaseCli';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Profile = () => {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateEntree, setDateEntree] = useState('');

  
  const [deleteModel, setDeleteModel] = useState(false);
  const [role, setRole] = useState('');
  const [spotchange, setSpotChange] = useState(false);
  useEffect(() => {
    
        const getuser = async () => {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            
            throw error.message;
          
          }

          else {
          if(data){
            const user = await supabase.from("user").select("*").eq("email",data.user.email)
            console.log(user);
            setNom(user.data[0].last_name)
            setPrenom(user.data[0].first_name)
            setRole(user.data[0].admin ? "admin":"regular")
            setEmail(user.data[0].email)
            setPassword(user.data[0].password)
          }else{
            const router = useRouter()
            router.push("/")
          }
        }
    
          
          
        }
        getuser();
        
      
    
  }, []);

  const savingchanges = async () => {
    console.log(email, password, nom, prenom);
    if ( email && password && nom && prenom) {
      const { data, error } = await supabase
        .from('user')
        .update({
          first_name: nom,
          last_name: prenom,
          admin:role ==='admin'? 1 : 0,
          email: email,
          password: password,
        })
        .eq('email', email);
  
      if (error) throw error.hint;
      console.log(data);
      setSpotChange(false);
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen "> 
    {role==="admin"?<AdminSidebar role={role}/>: <Sidebar/>}
    <div className=" flex-grow bg-[#14142B] min-h-screen overflow-hidden">
      

      <div className="flex flex-col max-w-md mx-auto gap-10 my-10">
        
        <div>
          <h1 className="text-xl my-5">Personal Infomations</h1>
          <div className="bg-white text-black p-5 gap-2 rounded-md flex flex-col">
            <label htmlFor="NumActe">Last Name</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setNom(e.target.value);
              }}
              className="border-b-2 text-white px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={nom}
            />
            <label htmlFor="NumActe">First Name</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setPrenom(e.target.value);
              }}
              className="border-b-2 text-white px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={prenom}
            />

          
            <label htmlFor="NumActe">Email</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setEmail(e.target.value);
              }}
              className="border-b-2 text-white px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={email}
            />
            <label htmlFor="NumActe">Password</label>
            <input
              type="password"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setPassword(e.target.value);
              }}
              className="border-b-2 text-white px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={password}
            />
            
            
          </div>
          {spotchange && (
            <button
              className="w-full py-2 bg-palet-green text-white rounded-full my-2 "
              onClick={savingchanges}
            >
              Save Changes
            </button>
          )}
        </div>
        <div></div>
      </div>
     
    </div>
    </div>
  );
};


export default Profile;
