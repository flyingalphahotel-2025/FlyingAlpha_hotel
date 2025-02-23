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
              <span className="text-2xl pinyon-script-regular text-white">Flying Alpha Hotel</span>
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
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Support
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <Link
              href="#"
              className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
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
                href="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Support
              </Link>

              {/* Mobile CTA Button */}
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link
                  href="#"
                  className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                  role="button"
                >
                  Start free trial
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