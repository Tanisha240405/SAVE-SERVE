import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');

  const ngos = {
    Delhi: ['Feeding India', 'Robin Hood Army'],
    Mumbai: ['Daan Utsav', 'Roti Bank'],
    Bengaluru: ['Akshaya Patra', 'Goonj'],
  };

  const matchingNGOs = searchCity && ngos[searchCity]
    ? ngos[searchCity]
    : [];

  return (
    <nav className="bg-[#fdf6ec] shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-[#6b3e26]">Save & Serve</Link>
        {user && (
          <span className="text-sm ml-2 text-[#8b5e3c] font-semibold">
            👤 Hello, {user.name}
          </span>
        )}
      </div>

      <div className="flex gap-4 items-center text-[#4b2c20]">
        <Link to="/">Home</Link>

        {user && <Link to="/Donate">Donate</Link>}

        {/* Explore Search Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:underline"
          >
            Explore ▾
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow p-4 z-10">
              <input
                type="text"
                placeholder="Search city (e.g. Delhi)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              {matchingNGOs.length > 0 ? (
                <ul className="text-sm">
                  {matchingNGOs.map((ngo, idx) => (
                    <li key={idx} className="py-1 border-b last:border-none">
                      {ngo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">No NGOs found</p>
              )}
            </div>
          )}
        </div>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/Profile">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
