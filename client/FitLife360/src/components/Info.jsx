import React from 'react';
import Gym from '../assets/gym2.jpg';


const Info = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4' src={Gym} alt='/' />
        <div className='flex flex-col justify-center'>
       
          <h1 className='md:text-4xl sm:text-3xl text-center md:text-left text-2xl font-bold py-2 font-font1 text-primary'>About FitLife360</h1>
          <p className='text-center md:text-justify text-lg py-2 font-bold font-font2'>At FitLife360, we are passionate about fitness and well-being. Our mission is to empower individuals on their journey to improved health and a better quality of life. We believe that fitness is not just about physical strength; it's a holistic approach that encompasses mental and emotional well-being.</p>
         
        
        </div>
      </div>
    </div>
  );
};

export default Info;