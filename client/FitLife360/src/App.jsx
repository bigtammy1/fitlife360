import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound';
import Classes from './pages/Classes';
// register
import RegisterLayout from './layout/RegisterLayout';
import Register from './pages/register/Register';
import RegisterUser from './pages/register/UserRegister';
import TrainerProfile from './pages/register/Trainer';
import MemberProfile from './pages/register/Member';
// trainer profile
import WelcomeTrainer from './pages/trainer/Welcome';
import Profile from './pages/trainer/Profile';
import Message from './pages/trainer/Message';
import Schedule from './pages/trainer/Schedule';
import Clients from './pages/trainer/Clients';
import Layout from "./layout/TrainerLayout";
// member profile
import MemberLayout from './layout/MemberLayout';
import Dashboard from './pages/member/Dashboard';
import WelcomeMember from './pages/member/Welcome';


function App() {
  // login details to localStorage
  const states = JSON.parse(localStorage.getItem('states')) || {};
  const { LOGIN, userName, Token, Trainer } = states;
  
  const [login, setLogin] = useState(LOGIN || false);
  const [username, setUsername] = useState(userName || '');
  const [token, setToken] = useState(Token || '');
  const [trainer, setTrainer] = useState(Trainer || '');
  

  // const [states, setStates] = useState({})
  const [authToken, setAuthToken] = useState('');
  
  // state changes
  useEffect(() => {
    const state = {
      login, username, token, trainer
    }
    localStorage.setItem('states', JSON.stringify(state));
  }, [login, username, token, trainer]);

  
  // useEffect(() => {
  //   window.addEventListener('beforeunload', () => {
  //     localStorage.setItem('states', JSON.stringify({
  //       login,
  //       username,
  //       token,
  //       trainer
  //     }));
  //   });
  // }, [login, username, token, trainer]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home login={login} token={token} setLogin={setLogin} />} />
        <Route path="/about" element={<About login={login} setLogin={setLogin}/>} />
        <Route path="/classes" element={<Classes login={login} token={token} setLogin={setLogin}/>} />
        <Route path="/login" element={<Login login={login} token={token} setToken={setToken} setLogin={setLogin} 
          setTrainer={setTrainer} setUsername={setUsername} />} />
        
        <Route path="/register" element={<RegisterLayout token={token} login={login} setLogin={setLogin}/>} >
          <Route index element={<RegisterUser setLogin={setLogin} setAuthToken={setAuthToken} setUsername={setUsername} />} />
          <Route path='role' element={<Register authToken={authToken} username={username} setToken={setToken} />} />
          <Route path="member" element={<MemberProfile setLogin={setLogin} token={token} />} />
          <Route path="trainer" element={<TrainerProfile setTrainer={setTrainer} token={token} />} />
          <Route path="*" element={<NotFound />} />
        </Route> 

        <Route path="/trainer" element={<Layout token={token} login={login} setLogin={setLogin} />}>
          <Route index element={<WelcomeTrainer username={userName} />} />
          <Route path="profile" element={<Profile trainer={trainer} />} />
          <Route path="messages" element={<Message trainer={trainer} />} />
          <Route path="schedule" element={<Schedule trainer={trainer} />} />
          <Route path="clients" element={<Clients trainer={trainer} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/member" element={<MemberLayout token={token} login={login} setLogin={setLogin} setTrainer={setTrainer}/>} >
          <Route index element={<WelcomeMember username={username} />} />
          <Route path="profile" element={<Dashboard trainer={trainer} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
