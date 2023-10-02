import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const RegisterLayout = ({login, token, username }) => {
  return (
    <div>
      <Navbar login={login} token={token} username={username} />
        <Outlet />
      <Footer/>
    </div>
  )
}

RegisterLayout.propTypes = {
  login: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default RegisterLayout;