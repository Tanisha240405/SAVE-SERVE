import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();

  // Don't render anything while checking auth state
  if (loading) return null;

  if (!user) {
    return <p className="text-center mt-20 text-lg">⚠️ You must be logged in.</p>;
  }

  const donationCount = typeof user.donations === 'number'
    ? user.donations
    : Array.isArray(user.donations)
    ? user.donations.length
    : 0;

  const points = donationCount * 20;

  return (
    <div className="p-10 bg-[#fdf6ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#6b3e26]">👋 Hello, {user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#5c4033]">My Donations</h2>
          <p className="text-[#6b3e26] text-lg">🔢 {donationCount} donations</p>
        </div>

        <div className="bg-lime-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Points Gained</h2>
          <p className="text-green-700 text-lg">🎯 {points} points</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
