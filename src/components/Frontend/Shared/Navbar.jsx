"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/Logo/FlyingAlpha.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-3 bg-black sm:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="#" className="flex">
              <span className="text-3xl pinyon-script-regular text-white font-bold">Flying Alpha Hotel</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <IoClose className="w-7 h-7" />
              ) : (
                <FaBars className="w-7 h-7" />
              )}
            </button>
          </div>

         {/* Desktop Navigation */}
          <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
            <Link
              href={"/"}
              className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080] hover:underline"
            >
              Home
            </Link>
            <Link
              href={"/AboutUs"}
              className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080] hover:underline "
            >
              AboutUs
            </Link>
            <Link
              href={"/ContactUs"}
              className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080] hover:underline"
            >
              ContactUs
            </Link>
            <Link
              href={"/FAQs"}
              className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080] hover:underline"
            >
              FAQs
            </Link>
          </nav>


          {/* Desktop CTA Button */}
          <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
      {/* Animated gradient border */}
      <motion.div
        className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[#FF0080] to-blue-600 group-hover:shadow-lg group-hover:shadow-[#FF0080]/50"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
        }}
      />
      {/* Button */}
      <Link
        href="#"
        className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-gray-700 bg-white border border-transparent rounded-full hover:underline"
        role="button"
      >
        Book Now
      </Link>
    </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
        {isMenuOpen && (
  <motion.nav
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col pt-8 pb-4 space-y-6 md:hidden"
  >
    <Link
      href="/"
      className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080]"
    >
      Home
    </Link>
    <Link
      href="/AboutUs"
      className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080]"
    >
      About Us
    </Link>
    <Link
      href="/ContactUs"
      className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080]"
    >
      Contact Us
    </Link>
    <Link
      href="/FAQs"
      className="text-base font-normal text-white transition-all duration-200 hover:text-[#FF0080]"
    >
      FAQs
    </Link>


      {/* Mobile CTA Button */}
    <div className="relative md:hidden flex items-center justify-center group">
      {/* Animated gradient border */}
      <motion.div
        className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[#FF0080] to-blue-600 group-hover:shadow-lg group-hover:shadow-[#FF0080]/100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
        }}
      />
      {/* Button */}
      <Link
        href="#"
        className="relative inline-flex items-center justify-center w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white border border-transparent rounded-full hover:underline"
        role="button"
      >
        Book Now
      </Link>
    </div>
      </motion.nav>
    )}

        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;