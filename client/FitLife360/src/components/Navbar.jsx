import { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../assets/logo.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = ({ login, token, username }) => {
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='w-full bg-primary'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white font-font2 font-semi-bold text-base'>
        <span className='flex'>
          <img src={Logo} className='w-100 h-20' alt='Logo' />
        </span>

        <ul className='hidden md:flex cursor-pointer font-font1 bg-white/5 rounded-full'>
          <li className='px-6 py-2'><Link to="/">Home</Link></li>
          <li className='px-6 py-2'><Link to="/about">About</Link></li>
          <li className='px-6 py-2'><Link to="/trainers">Trainers</Link></li>
          <li className='px-6 py-2'><Link to="/classes">Classes</Link></li>
          {!login && (<li className='px-6 py-2'><Link to="/login">Sign in</Link></li>)}
          {!login && (<li className='px-6 py-2'><Link to="/register">Sign up</Link></li>)}
        </ul>

        {login && <Link className='' to={`${token.split('_')[0] === 'member' ? '/member/profile' : '/trainer/profile'}`}>{username}</Link>}
        <div onClick={toggleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div className={nav ? 'absolute z-10 left-0 top-24 w-[60%] h-full border-r border-r-gray-900 bg-primary ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <ul className='p-3 cursor-pointer font-font1'>
            <li className='p-6 border-b border-gray-400'><Link to="/">Home</Link></li>
            <li className='p-6 border-b border-gray-400'><Link to="/trainers">Trainers</Link></li>
            <li className='p-6 border-b border-gray-400'><Link to="/classes">Classes</Link></li>
            <li className='p-6 border-b border-gray-400'><Link to="/about">About</Link></li>
            {!login && <li className='p-6 border-b border-gray-400'><Link to="/login">Sign in</Link></li>}
            {!login && <li className='p-6 border-b border-gray-400'><Link to="/register">Sign up</Link></li>}
            
          </ul>
        </div>

      </div>
    </div>
  );
};

Navbar.propTypes = {
  login: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Navbar;
