import Navbar from '../components/Navbar';
import Info from '../components/Info';
import Vision from '../components/Vision';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const About = ({login, token, username}) => {
  return (
    <>
      <Navbar login={login} token={token} username={username} />
      <Info />
      <Vision />
      <Footer />
    </>
  )
}

About.propTypes = {
  login: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default About;