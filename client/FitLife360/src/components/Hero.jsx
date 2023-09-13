import React from 'react';
import Gym from '../assets/gym1.jpg';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4' src={Gym} alt='/' />
        <div className='flex flex-col justify-center'>
       
          <h1 className='md:text-4xl sm:text-3xl text-center md:text-left text-2xl font-bold py-2 font-font1'>Unleash your fitness potentials from the comfort of your home</h1>
         
          <button className='bg-primary text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'><Link to="/register">Get Started</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;