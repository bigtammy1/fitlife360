import React from 'react';
import { Outlet } from "react-router-dom";
import Sidenav from '../components/Sidenav';





const MemberLayout = ({login, setLogin, token}) => {
  
 
  return (
    <div className='flex h-screen'>
      <Sidenav login={login} setLogin={setLogin} token={token}/>
      
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default MemberLayout;