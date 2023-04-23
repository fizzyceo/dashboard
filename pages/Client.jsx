import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import ClientMain from '../components/ClientMain';

export default function Client() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex transition-all">
      <Head>
        <title>Home - Next.js TailwindCSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row h-screen w-screen ">
      <Sidebar role={"regular"}/>
     <ClientMain/>
      </div>


             </div>
  );
}
