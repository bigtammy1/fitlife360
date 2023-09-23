import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import axios from 'axios';

const MemberProfile = ({setLogin, token}) => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [picture, setPicture] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL

  const profileData = {
    picture,
    weight,
    height,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${url}/api/instructor/register`, profileData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setLogin(true);
        window.localStorage.setItem('token', response.data.token);
        setFormData({});
        navigate('/user');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error);
      });
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
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto flex flex-col gap-8 md:flex-row md:items-center'>
          <div className='hidden md:block md:w-1/2'>
            <img className='w-[400px] h-[400px] mx-auto my-4' src={Gym} alt='Gym' />
          </div>
          <div className='md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
            <div>
            {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
            </div>
            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
              Member Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="picture">Profile picture</label>
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="file"
                  name="picture"
                  placeholder="Profile picture"
                  value={formData.picture}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="weight"
                  placeholder="Input your weight"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type=''
                  name="age"
                  placeholder="Gender"
                  value={formData.age}
                  onChange={handleChange}
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative mb-4">
                <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
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
                Register
              </button>
            </form>
          </div>
          {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
