"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
  <section className="relative py-12 overflow-hidden bg-gray-900 sm:pb-16 lg:pb-20 xl:pb-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
        {/* Right Column: Slider */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative hidden md:flex"
        >
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="absolute inset-0 object-cover w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Left Column: Text and Form */}
        <div>
            {/* Title */}
            <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl"
    >
    Experience Luxury at FlyingAlpha Hotel
    </motion.h1>

    {/* Description */}
    <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="mt-4 text-lg font-light text-gray-300 sm:mt-8 pinyon-script-regular"
    >
    Discover a world of elegance and comfort at FlyingAlpha Hotel. Whether you're here for leisure or business, we offer top-notch hospitality, luxurious rooms, and world-class dining for an unforgettable stay.
    </motion.p>
          {/* Trusted Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-12"
          >
            <p className="text-lg font-normal text-white pinyon-script-regular">
              Trusted by 50k+ users
            </p>

            <div className="flex items-center mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="url(#gradient)"
                  />
                ))}
              </div>
              <span className="ml-2 text-base font-normal text-white pinyon-script-regular">
                4.1/5
              </span>
              <span className="ml text-base font-normal text-gray-400 pinyon-script-regular" >
                (14k Reviews)
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default HeroSection;