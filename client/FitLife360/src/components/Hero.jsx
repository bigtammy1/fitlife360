import React from 'react';
import Gym from '../assets/gym1.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
     
           <div className="text-center lg:w-10/12 w-full">
         <h1 className="my-4 text-5xl font-bold font-font1 leading-tight text-secondary">
         Unleash your fitness potentials from the comfort of your home
         </h1>
         <p className="text-2xl mb-8 font-font2 text-gray-600">
          Fitness is more than just a physical journey; it's a transformative experience that touches every aspect of your life.
         </p>
         <div className="flex justify-center mx-auto">
           <button
             className="ml-4 bg-primary text-white font-medium rounded-md  py-4 px-8">
              <Link to="/register">
             Get Started
             </Link>
           </button>
         </div>
         </div>    
      </div>
    </div>
  );
};

export default Hero;