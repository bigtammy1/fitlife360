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
import Layout from "./layout/TrainerLayout";
// member profile
import MemberLayout from './layout/MemberLayout';
import Dashboard from './pages/member/Dashboard';
import WelcomeMember from './pages/member/Welcome';


function App() {
  // login details to localStorage
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [trainerOrTrainee, setTrainerOrTrainee] = useState('Trainer');

  // const [states, setStates] = useState({})
  const [authToken, setAuthToken] = useState('');
  
  
  // state changes
  useEffect(() => {
    const state = {
      login, username, token, trainerOrTrainee
    }
    localStorage.setItem('states', JSON.stringify(state));
  }, [login, username, token, trainerOrTrainee]);

  useEffect(() => {
    const storedState = localStorage.getItem('states');
    if (storedState) {
      const { login, username, token, trainerOrTrainee } = JSON.parse(storedState);
      setLogin(login);
      setUsername(username);
      setToken(token);
      setTrainerOrTrainee(trainerOrTrainee);
    }    
  }, []);
  
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('states', JSON.stringify({
        login,
        username,
        token,
        trainerOrTrainee
      }));
    });
  }, [login, username, token, trainerOrTrainee]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home login={login} token={token} setLogin={setLogin} />} />
        <Route path="/about" element={<About login={login} setLogin={setLogin}/>} />
        <Route path="/classes" element={<Classes login={login} token={token} setLogin={setLogin}/>} />
        <Route path="/login" element={<Login login={login} token={token} setToken={setToken} setLogin={setLogin} 
          setTrainerOrTrainee={setTrainerOrTrainee} setUsername={setUsername} />} />
        
        <Route path="/register" element={<RegisterLayout token={token} login={login} setLogin={setLogin}/>} >
          <Route index element={<RegisterUser setLogin={setLogin} setAuthToken={setAuthToken} setUsername={setUsername} />} />
          <Route path='role' element={<Register authToken={authToken} username={username} setToken={setToken} />} />
          <Route path="member" element={<MemberProfile setLogin={setLogin} token={token} />} />
          <Route path="trainer" element={<TrainerProfile setTrainerOrTrainee={setTrainerOrTrainee} />} />
          <Route path="*" element={<NotFound />} />
        </Route> 

        <Route path="/trainer" element={<Layout token={token} login={login} setLogin={setLogin} />}>
          <Route index element={<WelcomeTrainer />} />
          <Route path="profile" element={<Profile trainerOrTrainee={trainerOrTrainee} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/member" element={<MemberLayout token={token} login={login} setLogin={setLogin} setTrainerOrTrainee={setTrainerOrTrainee}/>} >
          <Route index element={<WelcomeMember />} />
          <Route path="profile" element={<Dashboard trainerOrTrainee={trainerOrTrainee} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
