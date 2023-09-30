import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full bg-[#416982] font-font2 '>
      <div className='w-full py-6 text-white px-4'>
        <div className='max-w-[1240px] mx-auto flex flex-col space-y-3'>
         
          <div className='flex justify-between flex-wrap'>
          <div className='my-4'>
          <img src={Logo} className='w-100 h-20'/>
      
        
          </div>
            <div>
              <div className='flex justify-evenly flex-wrap mt-8'>
                <Link to="/about" className='mx-4'>About</Link>
                <Link to="/career" className='mx-4'>Careers</Link>
                <Link to="/customer" className='mx-4'>Customer Care</Link>
                <Link to="/services" className='mx-4'>Services</Link>
              </div>
              <div className='flex justify-around md:w-[60%] my-6'>
                <FaFacebookSquare size={25} />
                <FaInstagram size={25} />
                <FaTwitterSquare size={25} />
                <FaGithubSquare size={25} />
                <FaDribbbleSquare size={25} />
              </div>
            </div>
            <div className='my-4'>
              <h3 className='md:text-xl sm:text-xl text-sm font-bold font-font1 py-2'>
                  Want tips & tricks to optimize your flow?
              </h3>
              <p className='mb-3'>Join our newsletter for valuable tips and stay in the fitness loop!</p>
              <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                <input
                  className='p-2 outline-none flex w-full rounded-md text-black'
                  type='email'
                  placeholder='Enter Email'
                />
                <button className='bg-primary text-white rounded-md font-medium w-full md:w-[200px] ml-4 my-6 px-5 py-2'>
                  Notify Me
                </button>
              </div>
              <p className='text-sm'>
                We care about the protection of your data. Read our{' '}
                <span className='text-white-100 font-bold cursor-pointer'>Privacy Policy.</span>
              </p>
            </div>
          </div>
          <div className=' border-b border-slate-400'></div>
          <div>
            <p className='float-right text-xs'>&copy; FitLife360 2023. All rights reserved</p>
          </div>
        </div>
    </div>
        
    </div>
  );
};

export default Footer;