import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Nearby from './pages/Nearby';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
