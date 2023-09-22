import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MemberLayout = ({login, token, setLogin}) => {
  return (
    <div>
      <Navbar login={login} token={token} setLogin={setLogin} />
        <Outlet />
      <Footer/>
    </div>
  )
}

export default MemberLayout;