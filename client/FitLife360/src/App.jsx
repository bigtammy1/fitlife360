import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/login/Login';
import Classes from './pages/Classes';
import RegisterLayout from './layout/RegisterLayout';
import Trainer from './pages/register/Trainer';
import Trainee from './pages/register/Trainee';
import Register from './pages/register/Register';
import Welcome from './pages/trainer/Welcome';
import Profile from './pages/trainer/Profile';
import Layout from "./layout/TrainerLayout";
import NotFound from './pages/NotFound';
import Dashboard from './pages/User';

function App() {
  const [login, setLogin] = useState(false)
  const [trainerOrTrainee, setTrainerOrTrainee] = useState('Trainer')
  // will be a trainer or a trainee
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home login={login} setLogin={setLogin} />} />
        <Route path="/about" element={<About login={login} setLogin={setLogin}/>} />
        <Route path="/classes" element={<Classes login={login} setLogin={setLogin}/>} />
        <Route path="/login" element={<Login login={login} setLogin={setLogin} setTrainerOrTrainee={setTrainerOrTrainee}/>} />
        <Route path="/user" element={<Dashboard login={login} setLogin={setLogin} setTrainerOrTrainee={setTrainerOrTrainee}/>} />
        <Route path="/register" element={<RegisterLayout login={login} setLogin={setLogin}/>} >
          <Route index element={<Register/>} />
          <Route path="trainee" element={<Trainee />} />
          <Route path="trainer" element={<Trainer setTrainerOrTrainee={setTrainerOrTrainee} />} />
          <Route path="*" element={<NotFound />} />
        </Route> 
        <Route path="/trainer" element={<Layout login={login} setLogin={setLogin} />}>
          <Route index element={<Welcome />} />
          <Route path="profile" element={<Profile trainerOrTrainee={trainerOrTrainee} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
