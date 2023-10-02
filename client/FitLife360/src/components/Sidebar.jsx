import React, {useState, useEffect} from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaSignOutAlt, FaCalendar, FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';
import axios from 'axios';

const Sidebar = ({ token, setLogin, setToken }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL
  const handleLogout = async () => {
    // handle logout
    await axios.post(`${url}/api/logout`, null, {
      headers: {
        'Content-Type': 'application/json',
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
    <div className={`w-20 transition-all duration-300 ${open ? 'w-72' : 'w-20'} h-screen bg-primary p-5 pt-8 relative`}>
      <div className="absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-primary px-2 py-3 m-auto bg-white transform transition-transform" onClick={() => setOpen(!open)}>
        <FaArrowLeft size={10} className={`text-primary m-auto ${!open && "rotate-180"}`} />
      </div>
      <Link to={'/'}>
      <img src={Logo} className={`transition-all duration-300 ${open ? 'w-50' : 'w-10 h-9'} h-20 m-auto mt-5`} alt="Logo" />
      </Link>
      <Link to="/trainer/profile">
        <div className={`flex gap-x-4 mt-5 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md `}>
          <div><FaUser size={15} className="text-white" /></div>
          <h1 className={`text-white origin-left text-lg ${!open && "scale-0"} duration-300`}>Profile</h1>
        </div>
      </Link>
      <Link to="/trainer/messages">
        <div className={`flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md `}>
          <div><FaEnvelope size={15} className="text-white" /></div>
          <h1 className={`text-white origin-left text-lg ${!open && "scale-0"} duration-300`}>Messages</h1>
        </div>
      </Link>
      <Link to="/trainer/schedule">
        <div className={`flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md `}>
          <div><FaCalendar size={15} className="text-white" /></div>
          <h1 className={`text-white origin-left text-lg ${!open && "scale-0"} duration-300`}>Schedule</h1>
        </div>
      </Link>
      <Link to="/trainer/clients">
        <div className={`flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md `}>
          <div><FaUsers size={15} className="text-white" /></div>
          <h1 className={`text-white origin-left ${!open && "scale-0"} text-lg duration-300`}>Clients</h1>
        </div>
      </Link>
      <Link to={'#'}>
        <div onClick={handleLogout} className={`flex gap-x-4 mt-2 items-center font-font2 px-2 py-2 cursor-pointer duration-500 hover:bg-secondary rounded-md `}>
          <div><FaSignOutAlt size={15} className="text-white" /></div>
          <h1 className={`text-white origin-left ${!open && "scale-0"} text-lg duration-300`}>Logout</h1>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar