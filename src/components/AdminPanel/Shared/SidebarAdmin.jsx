"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaShoppingCart, FaCog, FaSearch, FaListAlt, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";
import {  MdAdd } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SidebarAdmin = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Logout successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1500); // Redirect after 1.5 seconds
      } else {
        toast.error(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className="flex">
      <motion.div
        className="bg-gradient-to-b from-blue-900 to-teal-700 text-gray-200 h-screen p-5 shadow-lg overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold mb-4">FlyingAlpha Dashboard</h2>

          <Link href="/admin/dashboard" passHref>
            <SidebarItem
              icon={<FaHome />}
              label="Home"
              selected={selectedItem === 'Home'}
              onClick={() => setSelectedItem('Home')}
            />
          </Link>

          <SectionTitle title="Orders" />
          <Link href="/admin/dashboard/booking/AddBooking" passHref>
            <SidebarItem
              icon={<MdAdd />}
              label="Add Booking"
              selected={selectedItem === 'Add Booking'}
              onClick={() => setSelectedItem('Add Booking')}
            />
          </Link>
          <Link href="/admin/dashboard/booking/OnlineBooking" passHref>
            <SidebarItem
              icon={<FaShoppingCart />}
              label="Online Booking"
              selected={selectedItem === 'Online Booking'}
              onClick={() => setSelectedItem('Online Booking')}
            />
          </Link>
          <Link href="/admin/dashboard/orders" passHref>
            <SidebarItem
              icon={<FaListAlt />}
              label="All Bookings"
              selected={selectedItem === 'All Bookings'}
              onClick={() => setSelectedItem('All Bookings')}
            />
          </Link>
          <Link href="/admin/dashboard/orders/search" passHref>
            <SidebarItem
              icon={<FaSearch />}
              label="Search Bookings"
              selected={selectedItem === 'Search Bookings'}
              onClick={() => setSelectedItem('Search Bookings')}
            />
          </Link>

          <SectionTitle title="Policy" />
          <Link href="/admin/dashboard/PrivacyPolicy" passHref>
            <SidebarItem
              icon={<GiOpenBook />}
              label="PrivacyPolicy"
              selected={selectedItem === 'PrivacyPolicy'}
              onClick={() => setSelectedItem('PrivacyPolicy')}
            />
          </Link>
          <Link href="/admin/dashboard/TermsAndCondition" passHref>
            <SidebarItem
              icon={<FaBook />}
              label="TermsAndCondition"
              selected={selectedItem === 'TermsAndCondition'}
              onClick={() => setSelectedItem('TermsAndCondition')}
            />
          </Link>

          <SectionTitle title="Account" />
          <Link href="/admin/dashboard/profile" passHref>
            <SidebarItem
              icon={<FaUser />}
              label="Profile"
              selected={selectedItem === 'Profile'}
              onClick={() => setSelectedItem('Profile')}
            />
          </Link>
          <Link href="/admin/dashboard/settings" passHref>
            <SidebarItem
              icon={<FaCog />}
              label="Settings"
              selected={selectedItem === 'Settings'}
              onClick={() => setSelectedItem('Settings')}
            />
          </Link>

          <button
            className="mt-6 flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700 shadow-md"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ icon, label, selected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 shadow-sm cursor-pointer ${
        selected
          ? 'bg-teal-800 text-white border-l-4 border-gold-500'
          : 'hover:bg-teal-600 text-gray-200'
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span className="font-semibold text-sm">{label}</span>
    </motion.div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-sm font-medium mt-4 mb-2 text-gray-300">{title}</h3>
);

export default SidebarAdmin;