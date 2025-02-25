"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';

const CustomTextButton = ({ text, href }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Pop-up effect on hover
      whileTap={{ scale: 0.95 }} // Slight shrink on click
      transition={{ type: 'spring', stiffness: 300, damping: 10 }} // Smooth spring animation
      className="relative inline-flex items-center justify-center group"
      animate={{
        scale: [1, 1.05, 1], // Keyframes for continuous scaling
        transition: {
          duration: 1.5, // Duration of one loop
          repeat: Infinity, // Loop indefinitely
          ease: "easeInOut", // Smooth easing
        },
      }}
    >
      {/* Gradient border */}
      <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[#FF0080] to-blue-600 group-hover:shadow-lg group-hover:shadow-[#FF0080]/50" />
      
      {/* Button */}
      <Link
        href={href} // Dynamic href
        className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white  border border-transparent rounded-full"
        role="button"
      >
        {text} {/* Dynamic text */}
      </Link>
    </motion.div>
  );
};

export default CustomTextButton;