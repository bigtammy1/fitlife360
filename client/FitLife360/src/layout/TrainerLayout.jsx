// import React from 'react'
// import { Outlet } from "react-router-dom";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const TrainerLayout = ({login, setLogin, token}) => {
//   return (
//     <div>
//       <Navbar login={login} setLogin={setLogin} token={token} />
//         <Outlet />
//       <Footer/>
//     </div>
//   )
// }

// export default TrainerLayout
import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/sidebar';





const TrainerLayout = ({login, setLogin, token}) => {
  
 
  return (
    <div className='flex h-screen'>
      <Sidebar login={login} setLogin={setLogin} token={token}/>
      
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default TrainerLayout

