import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const RegisterUser = ({ setLogin, setAuthToken, setUsername }) => {
  const initialState = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    confPassword: ''
  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [spin, setSpin] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    if (formData.password === formData.confPassword) {
    formData.gender.toLowerCase()
    await axios.post(`${url}/api/register`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setLogin(true);
        setAuthToken(response.data.token);
        setUsername(response.data.name)
        setFormData(initialState);
        navigate('/register/role');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error);
      });
    } else {
      setErrorMessage('Passwords do not match');
    }
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
            <img className='w-[400px] h-[400px] mx-auto my-4 rounded-lg shadow-lg' src={Gym} alt='Gym' />
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
              Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
              <div className="relative mb-4">
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
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
              <div className="relative mb-4">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="password"
                  name="confPassword"
                  placeholder="Confirm Password"
                  value={formData.confPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary flex space-x-4 justify-center items-center text-white hover:bg-primary-dark"
              >
                <div>Register</div> <div>{spin && <Circles height={12} width={12} color='white'/>}</div>
              </button>
              <p className='mt-3'>Already have an account? <Link to={'/login'} className=' text-primary underline'>Login</Link></p>
            </form>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

RegisterUser.propTypes = {
  setLogin: PropTypes.func.isRequired,
  setAuthToken: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default RegisterUser;
