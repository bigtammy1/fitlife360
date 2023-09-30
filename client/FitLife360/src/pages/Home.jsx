import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export const Home = ({login, setLogin, token, setToken}) => {
  return (
    <>
      <Navbar login={login} setToken={setToken} token={token} setLogin={setLogin} />
      <Hero />
      <Footer />
    </>
  )
}

export default Home;