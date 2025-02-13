"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div>
      <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            {/* Left Column: Text and Form */}
            <div>
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Connecting Devs with Employers
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 text-lg font-normal text-gray-400 sm:mt-8"
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </motion.p>

              {/* Search Form */}
              

              {/* Trusted Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 sm:mt-12"
              >
                <p className="text-lg font-normal text-white">
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
                  <span className="ml-2 text-base font-normal text-white">
                    4.1/5
                  </span>
                  <span className="ml-1 text-base font-normal text-gray-500">
                    (14k Reviews)
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0">
                <svg
                  className="blur-3xl filter opacity-70"
                  style={{ filter: "blur(64px)" }}
                  width="444"
                  height="536"
                  viewBox="0 0 444 536"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="82.7339"
                      y1="550.792"
                      x2="-39.945"
                      y2="118.965"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="absolute inset-0">
                <img
                  className="object-cover w-full h-full opacity-50"
                  src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                  alt="Noise Background"
                />
              </div>

              <img
                className="relative w-full max-w-md mx-auto"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png"
                alt="Illustration"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;