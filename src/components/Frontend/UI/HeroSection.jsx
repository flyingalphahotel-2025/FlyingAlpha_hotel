"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const images = [
    "/Hotels/Bedroom1.jpg",
    "/Hotels/Bedroom2.jpg",
    "/Hotels/Bedroom3.jpg",
    "/Hotels/Bedroom4.jpg",
    "/Hotels/Bedroom1.jpg",
    "/Hotels/Bedroom3.jpg",
    "/Hotels/Bedroom2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full min-h-[50vh] flex flex-col md:flex-row">
      {/* Left Side Slider */}
      <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Overlay for better readability if needed */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Right Side Content */}
      <div className="flex flex-col justify-center items-start md:w-1/2 p-6 bg-gray-900">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          Experience Luxury at FlyingAlpha Hotel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-base md:text-lg text-gray-300"
        >
          Discover a world of elegance and comfort at FlyingAlpha Hotel. Enjoy luxurious rooms, world-class dining, and impeccable service tailored for your leisure or business needs.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => window.location.href = "/booking"}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
