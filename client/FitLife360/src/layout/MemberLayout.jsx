import { Outlet } from "react-router-dom";
import Sidenav from '../components/Sidenav';
import PropTypes from 'prop-types';

const MemberLayout = ({login, setLogin, setToken, token}) => {
  
 
  return (
    <div className='flex h-screen'>
      <Sidenav login={login} setLogin={setLogin} setToken={setToken} token={token}/>
      
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

MemberLayout.propTypes = {
  login: PropTypes.bool.isRequired,
  setLogin: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default MemberLayout;