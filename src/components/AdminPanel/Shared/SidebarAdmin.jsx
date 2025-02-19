"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAppleAlt, FaCarrot, FaPlus, FaShoppingCart, FaListUl, FaCog, FaSearch, FaHome } from "react-icons/fa";
import { FaTable, FaProductHunt } from "react-icons/fa6";
import { GiOpenBook } from "react-icons/gi";
import { MdOutlineLogout, MdPendingActions, MdOutlineRateReview } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdAdd } from "react-icons/md";
import { toast } from 'react-hot-toast';

const SidebarAdmin = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        router.push('/');
      } else {
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
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
        <Link href="/admin/dashboard/orders" passHref>
          <SidebarItem
            icon={<FaShoppingCart />}
            label="All Orders"
            selected={selectedItem === 'All Orders'}
            onClick={() => setSelectedItem('All Orders')}
          />
        </Link>
        <Link href="/admin/dashboard/orders/searchOrders" passHref>
          <SidebarItem
            icon={<MdPendingActions />}
            label="Search Orders"
            selected={selectedItem === 'Search Orders'}
            onClick={() => setSelectedItem('Search Orders')}
          />
        </Link>

        <h3 className="text-sm font-medium mt-4 mb-2 text-gray-300">Account</h3>
        <Link href="/admin/dashboard/profile" passHref>
          <SidebarItem
            icon={<ImProfile />}
            label="Profile"
            selected={selectedItem === 'Profile'}
            onClick={() => setSelectedItem('Profile')}
          />
        </Link>
        <Link href="/settings" passHref>
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
          <MdOutlineLogout className="h-4 w-4" aria-hidden="true" />
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
      <div className="w-4 h-4">{icon}</div>
      <span className="font-semibold text-sm">{label}</span>
    </motion.div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-sm font-medium mt-4 mb-2 text-gray-300">{title}</h3>
);

export default SidebarAdmin;
