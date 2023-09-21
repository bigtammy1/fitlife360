import React from 'react'
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';

const Register = () => {
  return (
    <>
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4' src={Gym} alt='/' />
        <div className='flex flex-col justify-center'>
       
        <button className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'><Link to="/register/trainer">Register as Trainer</Link></button>
        <button className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'><Link to="/register/trainee">Register as Trainee</Link></button>
        
        </div>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default Register