import React from 'react';
import Navbar from '../components/Navbar';
import Info from '../components/Info';
import Vision from '../components/Vision';
import Footer from '../components/Footer';

const About = ({login, setLogin, setToken, token}) => {
  return (
    <>
    <Navbar login={login} token={token} setToken={setToken} setLogin={setLogin} />
    <Info />
    <Vision />
    <Footer />
  </>
  )
}

export default About;