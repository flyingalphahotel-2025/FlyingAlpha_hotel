"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: '',
  });

  // Fetch data from the website (mock data for now)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with actual API call or data extraction logic
        const mockData = {
          email: 'info@flyingalpha.in',
          phone: '+91 1234567890',
          address: '123 Flying Alpha St, Bangalore, India',
        };
        setContactInfo(mockData);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchData();
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-6"
        variants={itemVariants}
      >
        Contact Us
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg text-gray-700 mb-8"
        variants={itemVariants}
      >
        Have questions or need assistance? Feel free to reach out to us. We’re here to help!
      </motion.p>

      {/* Contact Info */}
      <motion.div
        className="bg-blue-50 p-6 rounded-lg mb-8"
        variants={itemVariants}
      >
        <p className="text-gray-700"><span className="font-semibold">Email:</span> {contactInfo.email}</p>
        <p className="text-gray-700"><span className="font-semibold">Phone:</span> {contactInfo.phone}</p>
        <p className="text-gray-700"><span className="font-semibold">Address:</span> {contactInfo.address}</p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        className="space-y-6"
        variants={itemVariants}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
        >
          Submit
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;