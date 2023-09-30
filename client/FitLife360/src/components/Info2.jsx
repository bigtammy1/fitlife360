import React from 'react';
import Gym from '../assets/gym1.jpg';


const Info2 = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4 rounded-lg shadow-lg' src={Gym} alt='/' />
        <div className='flex flex-col justify-center'>
       
          <h1 className='md:text-4xl sm:text-3xl text-center md:text-left text-2xl font-bold py-2 font-font1 text-secondary'>Discover FitLife360</h1>
          <p className='text-center md:text-justify text-lg py-2 font-bold font-font2 text-gray-600'>FitLife360 is designed to empower individuals on their journey to improved well-being. It offers a holistic approach to health, providing personalized exercise recommendations and progress monitoring. Whether your goal is weight management, muscle gain or staying fit, FitLife360 offers the required guidance.
        </p>       
        </div>
      </div>
    </div>
  );
};

export default Info2;