import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [address, setAddress] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleDonate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      return navigate('/login');
    }

    try {
      await axios.post(
        'http://localhost:5000/api/donations',
        {
          providerName: user?.name || 'Anonymous', // ✅ Add providerName
          foodType,
          quantity,
          expiryTime,
          address,
          location: { type: 'Point', coordinates: [77.2090, 28.6139] }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Our Team will contact you soon!');

      // Update local state and storage
      const updatedUser = {
        ...user,
        donations: (user.donations || 0) + 1,
        points: (user.points || 0) + 20
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Clear form
      setFoodType('');
      setQuantity('');
      setExpiryTime('');
      setAddress('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Donation failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-[#fff8f0] border border-[#deb887] rounded shadow">
      <h2 className="text-2xl font-bold text-[#6b3e26] mb-4 text-center">Submit a Donation</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <input
          type="text"
          placeholder="What are you donating?"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full p-2 border border-[#d2b48c] rounded focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 5 kg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-[#d2b48c] rounded focus:outline-none"
          required
        />
        <input
          type="datetime-local"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
          className="w-full p-2 border border-[#d2b48c] rounded focus:outline-none"
          required
        />
        <textarea
          placeholder="Pickup Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-[#d2b48c] rounded focus:outline-none"
          rows="2"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#a0522d] text-white py-2 rounded hover:bg-[#8b4513] transition"
        >
          Donate Now
        </button>
      </form>
      <p className="mt-4 text-sm text-[#5c4033] text-center">
        Earn <span className="font-semibold">20 points</span> with each donation!
      </p>
    </div>
  );
};

export default Donate;
