import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Info from '../components/Info2';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';


const Home = ({login, token, username}) => {
  return (
    <>
      <Navbar login={login} username={username} token={token} />
      <Hero />
      <Info />
      <Footer />
    </>
  )
}

Home.propTypes = {
  login: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default Home;