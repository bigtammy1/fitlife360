import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export const Home = ({login, setLogin}) => {
  return (
    <>
      <Navbar login={login} setLogin={setLogin} />
      <Hero />
      <Footer />
    </>
  )
}

export default Home;