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
import MemberMessages from './pages/member/Messages';
import MemberClasses from './pages/member/Classes';
import Progress from './pages/member/Progress';
import MemberWorkouts from './pages/member/Workout';
import Trainers from './pages/Trainers';



function App() {
  // login details to localStorage
  
  
  const [login, setLogin] = useState(localStorage.login || false);
  const [username, setUsername] = useState(localStorage.username || '');
  const [token, setToken] = useState(localStorage.token || '');
  const [trainer, setTrainer] = useState(localStorage.trainer || '');
  const [authToken, setAuthToken] = useState('');
  
  // state changes
  useEffect(() => {
    localStorage.setItem('login', login);
  }, [login]);
  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  useEffect(() => {
    localStorage.setItem('trainer', trainer);
  }, [trainer]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home login={login} token={token} setToken={setToken} setLogin={setLogin} />} />
        <Route path="/about" element={<About login={login} setToken={setToken} setLogin={setLogin}/>} />
        <Route path="/classes" element={<Classes login={login} token={token} setToken={setToken} setLogin={setLogin}/>} />
        <Route path="/trainers" element={<Trainers login={login} token={token} setToken={setToken} setLogin={setLogin}/>} />
        <Route path="/login" element={<Login login={login} token={token} setToken={setToken} setLogin={setLogin} 
          setTrainer={setTrainer} setUsername={setUsername} />} />
        
        <Route path="/register" element={<RegisterLayout token={token} login={login} setToken={setToken} setLogin={setLogin}/>} >
          <Route index element={<RegisterUser setLogin={setLogin} setAuthToken={setAuthToken} setUsername={setUsername} />} />
          <Route path='role' element={<Register authToken={authToken} username={username} setToken={setToken} />} />
          <Route path="member" element={<MemberProfile setLogin={setLogin} token={token} />} />
          <Route path="trainer" element={<TrainerProfile setTrainer={setTrainer} setLogin={setLogin} token={token} />} />
          <Route path="*" element={<NotFound />} />
        </Route> 

        <Route path="/trainer" element={<Layout token={token} setLogin={setLogin} setToken={setToken} />}>
          <Route index element={<WelcomeTrainer username={username} />} />
          <Route path="profile" element={<Profile trainer={trainer} token={token} />} />
          <Route path="messages" element={<Message trainer={trainer} token={token} />} />
          <Route path="schedule" element={<Schedule trainer={trainer} token={token} />} />
          <Route path="clients" element={<Clients trainer={trainer} token={token} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/member" element={<MemberLayout token={token} login={login} setToken={setToken} setLogin={setLogin} setTrainer={setTrainer}/>} >
          <Route index element={<WelcomeMember username={username} />} />
          <Route path="profile" element={<Dashboard token={token} />} />
          <Route path="messages" element={<MemberMessages token={token} />} />
          <Route path="workouts" element={<MemberWorkouts token={token} />} />
          <Route path="classes" element={<MemberClasses token={token} />} />
          <Route path="progress" element={<Progress token={token} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
