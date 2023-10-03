import React from 'react'
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

const Register = ({ authToken, username, setToken }) => {
  const navigate = useNavigate()
  const applyTrainer = async () => {
    await axios
      .post(`${url}/api/role`, {'role': 'trainer'}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        }
      })
      .then(res => {
        const data = res.data
        setToken(data.token)
        navigate('/register/trainer', {replace: true})
      })
      .catch(err => console.error(err));
  }

  const applyMember = async () => {
    await axios
      .post(`${url}/api/role`, {'role': 'member'}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        }
      })
      .then(res => {
        const data = res.data;
        setToken(data.token);
        navigate('/register/member', {replace: true})
      })
      .catch(err => console.error(err));
  }
  return (
    <>
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <img className='w-[500px] mx-auto my-4 rounded-lg shadow-lg' src={Gym} alt='/' />
        <div className='flex flex-col justify-center text-center'>
        <h2 className='text-2xl font-bold mt-5 mb-2 text-secondary'>Welcome {username}</h2>
        <p className='text-lg font-medium m-3 text-footer'>Thank you for creating an account with us</p>
        <p className='text-lg font-medium m-3 text-footer'>Who do you want to register as?</p>
        <button onClick={applyTrainer} className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'>Register as Trainer</button>
        <button onClick={applyMember} className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'>Register as Trainee</button>
        
        </div>
      </div>
    </div>
    
  </>
  )
}

export default Register