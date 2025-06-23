import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://i.pinimg.com/736x/27/fb/b4/27fbb4c28e8e440b57a409bab83831a3.jpg',
    'https://i.pinimg.com/736x/64/e2/2d/64e22d8e703a88bdc502babcfa95b530.jpg',
    'https://i.pinimg.com/736x/fd/49/89/fd49897ebabf8a6638669d7001e051e6.jpg',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d',
    'https://i.pinimg.com/736x/e1/82/d5/e182d567c2032a2b6f38bffdd9b86afa.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      {/* Slideshow */}
      <div className="relative w-full overflow-hidden h-[400px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((src, index) => (
            <img
              key={index}
              src={`${src}?w=1600&q=80`}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-[#4e342e] mb-4">Save & Serve</h1>
        <p className="text-lg text-[#6d4c41] max-w-2xl mx-auto">
          Bridge food waste and hunger — donate leftover meals and make a difference!
        </p>

        <div className="mt-8 space-x-4">
          {user ? (
            <Link
              to="/donate"
              className="bg-[#8d6e63] text-white px-6 py-3 rounded hover:bg-[#6d4c41] transition"
            >
              Donate Food
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-[#efebe9] text-[#5d4037] px-6 py-3 rounded hover:bg-[#d7ccc8] transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </header>

      {/* What You Can Donate Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-[#4e342e] mb-6 text-center">What You Can Donate</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Fresh meals",
              "Sandwiches",
              "Fruits & veggies",
              "Packaged dishes",
              "Bakery items",
              "Cooked leftovers"
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-[#5d4037] p-4 rounded shadow transform transition hover:scale-105"
              >
                🍱 {item}
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#4e342e] mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Signup or Login",
              "Submit your food donation",
              "Nearby volunteers or NGOs claim it",
              "Earn points & help your community"
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white text-[#5d4037] p-4 rounded shadow transform transition hover:scale-105"
              >
                {idx + 1}. {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <footer className="bg-[#f5e9dd] py-12 mt-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Contact Us</h2>
          <p className="text-[#6d4c41] mb-2">📍 123, New Delhi, India</p>
          <p className="text-[#6d4c41] mb-2">📞 +91 98765 43210</p>
          <p className="text-[#6d4c41] mb-4">✉️ support@saveandserve.org</p>

          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#3b5998] text-xl hover:underline">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#e1306c] text-xl hover:underline">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1da1f2] text-xl hover:underline">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
