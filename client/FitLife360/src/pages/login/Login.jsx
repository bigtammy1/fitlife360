import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_BACKEND_URL

const Login = ({login, setLogin, setTrainerOrTrainee}) => {
  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [trainerData, setTrainerData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate()
  
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${url}/api/user/login`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setLogin(true);
        window.localStorage.setItem('token', response.data.token);
        setFormData(initialState);
        navigate('/user');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error);
      });
  };
  

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    console.log(trainerData)
    await axios.post(`${url}/api/instructor/login`, trainerData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setLogin(true);
        setTrainerOrTrainee('Trainer');
        window.localStorage.setItem('token', response.data.token);
        setTrainerData(initialState);
        navigate('/trainer')
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error)
      });
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({
      ...trainerData,
      [name]: value,
    });
  };
  return (
    <>
      <Navbar login={login} setLogin={setLogin} />
      <div className='w-full min-h-[100vh] bg-white py-16 px-4'>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div className='max-w-[1240px] mx-auto flex flex-col-reverse gap-8 md:flex-row items-center'>
        <div className='w-[80%] md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
            Login as Trainee
          </h1>
        <form onSubmit={handleUserSubmit}>
        <div className="relative mb-4">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleUserChange}
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
            onChange={handleUserChange}
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
        {/* Trainer login */}
        <div className='w-[80%] md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
            Login as Trainer
          </h1>
        <form onSubmit={handleTrainerSubmit}>
        <div className="relative mb-4">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={trainerData.email}
            onChange={handleTrainerChange}
          />
        </div>
        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={trainerData.password}
            onChange={handleTrainerChange}
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
      </div>
      {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
    </div>
      <Footer />
    </>
  )
}

export default Login;