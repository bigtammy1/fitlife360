import React, {useState} from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import Logo from '../assets/logo.png';

const TrainerLayout = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {title: "Profile", src: "Chart_fill"},
    {title: "Profile", src: "Chart_fill"},
    {title: "Profile", src: "Chart_fill"},
    {title: "Profile", src: "Chart_fill"},
  ]
  return (
    <div className='flex'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen bg-primary p-5 pt-8 relative`}>
        <div className={`absolute cursor-pointer rounded-full -right-3  top-9 w-7 border-2 border-primary px-2 py-3 m-auto bg-white ${!open && "rotate-180"}`} alt='control' onClick={() => setOpen(!open)}><FaArrowLeft size={10} className='text-primary m-auto'/></div>
        

        <img src={Logo}  className={`${open ? 'block w-50' : 'hidden'} h-20 m-auto mt-9 `} alt='Logo' />
     
         <div className='flex gap-x-4 mt-10 items center font-font2'>
        <div className='cursor-pointer duration-500'><FaArrowLeft size={20} className='text-white'/></div>
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Fit</h1>
      </div> 
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <li key={index}>{menu.title}</li>

        ))}
      </ul>
      
      <div className='flex-1 h-screen p-7'>
      <Outlet />
      </div>
    </div>
  )
}

export default TrainerLayout