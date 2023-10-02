import React, {useState, useEffect} from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaSignOutAlt, FaDumbbell } from 'react-icons/fa';
import { IoFitnessOutline } from 'react-icons/io5'
import { BsCalendar } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from '../assets/logo.png';
import icon from '../assets/icon.png';


const Sidenav = ({setLogin, token, setToken}) => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL
  const handleLogout = async () => {
    // handle logout
    await axios.post(`${url}/api/logout`, null, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        console.log(response.data);
        localStorage.clear();
        setLogin(false);
        setToken('');
        navigate('/', {replace: true});
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    // Set initial state
    handleResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen bg-primary p-5 pt-8 relative`}>
        <div className={`absolute cursor-pointer rounded-full -right-3  top-9 w-7 border-2 border-primary px-2 py-3 m-auto bg-white ${!open && "rotate-180"}`} alt='control' onClick={() => setOpen(!open)}><FaArrowLeft size={10} className='text-primary m-auto'/></div>
        <Link to={'/'}>
          <img src={Logo} className={`transition-all duration-300 ${open ? 'w-50' : 'w-10 h-9'} h-20 m-auto mt-5`} alt="Logo" />
        </Link>
        <Link to="/member/profile">
          <div className='flex gap-x-4 mt-5 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaUser size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Profile</h1>
          </div>
        </Link> 
        <Link to="/member/messages">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaEnvelope size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Messages</h1>
          </div>
        </Link> 
       
        <Link to="/member/workouts">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaDumbbell size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Workout</h1>
          </div>
        </Link> 
        <Link to="/member/classes">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><BsCalendar size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Classes</h1>
          </div>
        </Link> 
        <Link to="/member/progress">
          <div className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><IoFitnessOutline size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Progress</h1>
          </div>
        </Link> 
        <Link to="#">
          <div onClick={handleLogout} className='flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md'>
            <div><FaSignOutAlt size={15} className='text-white'/></div>
            <h1 className={`text-white origin-left text-lg duration-300 ${!open && "scale-0"}`}>Logout</h1>
          </div>
        </Link>
        
        
      </div>
  )
}

export default Sidenav