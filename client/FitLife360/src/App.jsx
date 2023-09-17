import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Trainer from './pages/Trainer';
import Trainee from './pages/Trainee';
import Register from './pages/Register';
import Welcome from './pages/trainer/Welcome';
import Profile from './pages/trainer/Profile';
import Layout from "./layout/TrainerLayout";
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/trainee" element={<Trainee />} />
        <Route path="/register/trainer" element={<Trainer />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
