"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTextButton from './Reusable/CustomButton';

const HeroSection = () => {
  const images = [
    "/Hotels/Bedroom1.jpg",
    "/Hotels/Bedroom2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
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
      <div className="relative flex flex-col justify-center items-start md:w-1/2 p-6 bg-gray-900 overflow-hidden">
      {/* Meteors Effect */}
      <Meteors />

      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-5xl font-bold text-white"
      >
        Experience Luxury at <span className="text-[#FF0080]">FlyingAlpha Hotel</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 text-base md:text-lg text-gray-300"
      >
        Discover a world of elegance and comfort at FlyingAlpha Hotel. Enjoy luxurious rooms, world-class dining, and impeccable service tailored for your leisure or business needs.
      </motion.p>

      <div className="my-4">
        <CustomTextButton text="Book Now" href="/booking" />
      </div>
    </div>
    </div>
  );
};

const Meteors = () => {
  return (
    <>
      {/* Meteor 1 */}
      <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: "100vw", y: "100vh", opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-[#FF0080]"
        style={{ top: "10%", left: "10%" }}
      />
      {/* Meteor 2 */}
      <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: "100vw", y: "100vh", opacity: 1 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-[#FF0080]"
        style={{ top: "30%", left: "20%" }}
      />
      {/* Meteor 3 */}
      <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: "100vw", y: "100vh", opacity: 1 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-[#FF0080]"
        style={{ top: "50%", left: "30%" }}
      />
    </>
  );
};

export default HeroSection;
