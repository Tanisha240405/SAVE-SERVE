import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setMessage('Signup successful!');
      console.log(res.data);
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6ec]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-80 border border-[#deb887]"
      >
        <h2 className="text-2xl font-bold text-[#6b3e26] mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-[#d2b48c] rounded focus:outline-none focus:ring focus:border-[#a0522d]"
          required
        />
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
          Sign Up
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 text-sm">{message}</p>
        )}

        <p className="mt-4 text-sm text-center text-[#5c4033]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8b4513] font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
