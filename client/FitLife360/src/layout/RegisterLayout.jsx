import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterLayout = ({login, setLogin, token, setToken }) => {
  return (
    <div>
      <Navbar login={login} token={token} setToken={setToken} setLogin={setLogin} />
        <Outlet />
      <Footer/>
    </div>
  )
}

export default RegisterLayout