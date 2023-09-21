import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TrainerLayout = ({login, setLogin}) => {
  return (
    <div>
      <Navbar login={login} setLogin={setLogin} />
        <Outlet />
      <Footer/>
    </div>
  )
}

export default TrainerLayout