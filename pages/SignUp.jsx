import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import supabase from '../utils/SupabaseCli';

const SignUp = () => {
  const router = useRouter();
  //get the email & password
  //check with the supabase user table if the user exists
  //if yes add a session and redirect to the home page or dashboard

  const [issent, setissent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [password, setPassword] = useState('');
  const AddUser = async () => {
    if (password && email) {
      const IS_USER = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .eq('password', password);
      //on verifier que l'user existe d'abord dans la base de donnes

      // on cree un compte dans ce systeme pour lui si il n'a pas un deja
      console.log(IS_USER.data.length);
      if (IS_USER.data.length == 0) {
        
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

            if (error){
                setError(error.message)
                throw error.message;}
            

            if (data) {
                
                const { data, error } = await supabase.from('user').insert([
                    {
                      
                      first_name: firstName,
                      last_name: lastName,
                      email: email,
                      password: password,
                      admin: false,
                      
                    },
                  ]);
                  if (error) {
                    setError(error.message);
                    throw error.message;
                  }
                  setissent(true)
                }
      } else {
        setError('user with this email already exists!');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  return (
    <div>
      {!issent ? (
        <main className="  bg-slate-900 w-screen min-h-screen">
          <h1 className="text-white text-center py-6 text-3xl ">
            Sign Up Page
          </h1>

          <section className="max-w-[475px] rounded-md mt-16 p-6  bg-slate-700  mx-auto flex justify-center h-fit  flex-col gap-5 items-center ">
            <h1 className="text-white font-semibold text-xl">
              Insert Credentials
            </h1>
            <p>{error}</p>
            
            <div className="w-full">
              <h3 className="text-white my-1">First Name:</h3>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Your Fist Name..."
                className="rounded-md px-3 w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            
            <div className="w-full">
              <h3 className="text-white my-1">Last Name:</h3>
              <input
                value={lastName}
                onChange={(e) =>setLastName(e.target.value)}
                type="text"
                placeholder="Your Last Name..."
                className="rounded-md px-3 w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            
            <div className="w-full">
              <h3 className="text-white my-1">Email:</h3>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Your Email"
                className="rounded-md px-3 w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            <div className="w-full">
              <h3 className="text-white my-1">Password:</h3>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                className="rounded-md px-3  w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            <button
              onClick={AddUser}
              className="w-full py-2 my-3 bg-purple-900 text-white"
            >
              Sign Up
            </button>
          </section>
        </main>
      ) : (
        <div className="w-screen flex flex-col gap-3 items-center bg-slate-900 text-xl text-white justify-center h-screen">
          <h1> We sent you a confirmation Email! on {email} !</h1>
          <a href="/" className='bg-opacity-50 flex gap-2 bg-green-500 p-3 rounded-md hover:bg-opacity-100 transition-all '>  <img src="/arrow.png" className='filter' alt="" /> <p> go back home</p></a>
        </div>
      )}
    </div>
  );
};

export default SignUp;
