import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import Logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className='w-full bg-black font-font2 '>
        <div className='w-full py-6 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid gap-16 lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
        
        
        <img src={Logo} className='w-100 h-24'/>
    
        <p className='py-4 text-justify'>FitLife360 is designed to empower individuals on their journey to improved well-being. It offers a holistic approach to health, providing personalized exercise recommendations and progress monitoring. Whether your goal is weight management, muscle gain or staying fit, FitLife360 offers the required guidance.</p>
        <div className='flex justify-between md:w-[60%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      
        </div>
        <div className='my-4'>
        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold font-font1 py-2'>
            Want tips & tricks to optimize your flow?
          </h1>
          <p className='mb-3'>Join our newsletter for valuable tips and stay in the fitness loop!</p>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter Email'
            />
            <button className='bg-primary text-white rounded-md font-medium w-full md:w-[200px] ml-4 my-6 px-6 py-3'>
              Notify Me
            </button>
          </div>
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-primary cursor-pointer'>Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
        
    </div>
  );
};

export default Footer;