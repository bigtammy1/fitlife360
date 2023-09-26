import React, {useState} from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaSignOutAlt, FaDumbbell } from 'react-icons/fa';
import { IoFitnessOutline } from 'react-icons/io5'
import { BsCalendar } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Logo from '../assets/logo.png';

const Sidenav = () => {
    const [open, setOpen] = useState(true);
  return (
    <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen bg-primary p-5 pt-8 relative`}>
        <div className={`absolute cursor-pointer rounded-full -right-3  top-9 w-7 border-2 border-primary px-2 py-3 m-auto bg-white ${!open && "rotate-180"}`} alt='control' onClick={() => setOpen(!open)}><FaArrowLeft size={10} className='text-primary m-auto'/></div>
        
        <img src={Logo}  className={`${open ? 'w-50' : 'invisible'} h-20 m-auto mt-5`} alt='Logo' />
   
     
        <Link to="/dashboard">
          <div className='flex gap-x-4 mt-5 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaUser size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Profile</h1>
          </div>
        </Link> 
        <Link to="/dashboard/messages">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaEnvelope size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Messages</h1>
          </div>
        </Link> 
       
        <Link to="/">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaDumbbell size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Workout</h1>
          </div>
        </Link> 
        <Link to="/">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><BsCalendar size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Classes</h1>
          </div>
        </Link> 
        <Link to="/">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><IoFitnessOutline size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Progress</h1>
          </div>
        </Link> 
        <Link to="/dashboard/messages">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaSignOutAlt size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Logout</h1>
          </div>
        </Link>
        
        
      </div>
  )
}

export default Sidenav