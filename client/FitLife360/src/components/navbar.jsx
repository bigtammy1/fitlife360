import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='w-full bg-primary'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white font-font2 font-bold text-xl'>
        <span className='flex'>
          <img src={Logo} className='w-100 h-20' alt='Logo' />
        </span>

        <ul className='hidden md:flex cursor-pointer font-font1'>
          <li className='p-6'><Link to="/">HOME</Link></li>
          <li className='p-6'><Link to="/about">ABOUT</Link></li>
          <li className='p-6'><Link to="/login">SIGN IN</Link></li>
          <li className='p-6'><Link to="/register">SIGN UP</Link></li>
        </ul>

        <div onClick={toggleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div className={nav ? 'fixed left-0 top-24 w-[60%] h-full border-r border-r-gray-900 bg-primary ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <ul className='p-3 cursor-pointer font-font1'>
            <li className='p-6 border-b border-gray-400'><Link to="/">HOME</Link></li>
            <li className='p-6 border-b border-gray-400'><Link to="/about">ABOUT</Link></li> {/* Fixed the label */}
            <li className='p-6 border-b border-gray-400'><Link to="/login">SIGN IN</Link></li>
            <li className='p-6 border-b border-gray-400'><Link to="/register">SIGN UP</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
