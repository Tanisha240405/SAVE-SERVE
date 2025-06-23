// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.user); // store user in context + localStorage
      navigate('/profile'); // ensure this matches your route path
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6ec]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 border border-[#deb887]"
      >
        <h2 className="text-2xl font-bold text-[#6b3e26] mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-[#d2b48c] rounded focus:outline-none focus:ring focus:border-[#a0522d]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-[#d2b48c] rounded focus:outline-none focus:ring focus:border-[#a0522d]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#a0522d] text-white py-2 rounded hover:bg-[#8b4513] transition"
        >
          Log In
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 text-sm">{message}</p>
        )}

        <p className="mt-4 text-sm text-center text-[#5c4033]">
          Not a user?{' '}
          <Link to="/signup" className="text-[#8b4513] font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
