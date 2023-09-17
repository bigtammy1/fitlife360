import React, {useState} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gym from '../assets/gym4.jpg';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Navbar />
      <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto flex flex-col-reverse gap-8 md:flex-row md:items-center'>
        <div className='md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
            Login
          </h1>
          <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 p-3 w-full rounded-md bg-primary text-white hover:bg-primary-dark"
        >
          Submit
        </button>
      </form>
        </div>
        <div className='hidden md:block md:w-1/2'>
          <img className='w-[400px] h-[400px] mx-auto my-4' src={Gym} alt='Gym' />
        </div>
      </div>
    </div>
      <Footer />
    </>
  )
}

export default Login