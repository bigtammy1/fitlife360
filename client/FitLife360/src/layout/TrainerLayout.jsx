import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';


const TrainerLayout = ({ setLogin, token, setToken }) => {

  return (
    <div className='flex h-screen'>
      <Sidebar setLogin={setLogin} setToken={setToken} token={token}/>
      
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default TrainerLayout

