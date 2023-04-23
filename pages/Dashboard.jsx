import Head from 'next/head';
import AdminSidebar from '../components/AdminSidebar';
import { useState } from 'react';
import AdminMain from '../components/AdminMain';

export default function Dashboard() {

  const [menu,setMenu] = useState(1)
  return (
    <div className="flex transition-all">
      <Head>
        <title>Home - Next.js TailwindCSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row h-screen w-screen ">
      <AdminSidebar role={"admin"} setMenu={setMenu}/>
     <AdminMain menu={menu}/>
      </div>


             </div>
  );
}
