"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const images = [
    "/Hotels/Bedroom1.jpg",
    "/Hotels/Bedroom4.jpg",
    "/Hotels/gate.jpg",
    "/Hotels/Reception.jpeg",
    "/Hotels/Bedroom2.jpg",
  ];

  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Title & Address */}
        <div>
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hotel O Flying Alpha
          </motion.h2>
          <p className="text-sm md:text-base text-gray-400">
            Plot No 31/B Rajeev Nagar Main Road, Opposite Ruban Singh Market, <br /> Near Rajdhani Kirana Store, Road No Zero, Patna
          </p>
          <p className="mt-4 text-sm md:text-base text-gray-400">
            support@hotelflyingalpha.com
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-500">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-yellow-500">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/contactUs" className="hover:text-yellow-500">
                CONTACT US
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-yellow-500">
                EVENTS
              </Link>
            </li>
            <li>
              <Link href="/bookNow" className="hover:text-yellow-500">
                BOOK NOW
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Gallery */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-12 md:h-16 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm md:text-base">
            © All rights reserved 2025{" "}
            <span className="font-bold text-[#FF0080]">
              Hotel O Flying Alpha
            </span>
          </p>
          <div className="flex space-x-4 items-center">
            <Link
              href="/privacyPolicy"
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refundPolicy"
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Refund and Returns Policy
            </Link>
            <Link
              href="/termsAndConditions"
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
