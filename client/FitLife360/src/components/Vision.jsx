import React from 'react';
import Gym from '../assets/gym3.jpg';

const Vision = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto flex flex-col-reverse gap-8 md:flex-row md:items-center'>
        <div className='md:w-1/2'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl text-center md:text-justify font-bold py-2 font-font1 text-secondary'>
            Our Vision
          </h1>
          <p className='text-lg text-center md:text-justify py-2 font-bold font-font2 text-gray-600'>
            Our vision is to create a supportive and motivating fitness community where everyone can achieve their fitness goals, regardless of their level of experience or fitness background. We aim to provide you with the tools, guidance, and inspiration you need to lead a healthier and happier life.
          </p>
        </div>
        <div className='md:w-1/2'>
          <img className='w-[400px] h-[400px] mx-auto my-4 rounded-lg shadow-lg' src={Gym} alt='Gym' />
         
        </div>
      </div>
    </div>
  );
};

export default Vision;
