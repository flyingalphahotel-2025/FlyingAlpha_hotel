'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

export default function ProfileSettings() {
  const [enabled, setEnabled] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [fullName, setFullName] = useState('Amit Kumar');
  const [email, setEmail] = useState('amit@cleanveda.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Mumbai, India');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="max-w-full mx-auto p-4 bg-gray-50 rounded-lg w-full h-[90vh] overflow-y-auto max-h-[86vh] custom-scrollbar flex flex-col">
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-black">Profile Settings</h1>
        {/* Profile Picture and Info */}
        <div className="flex items-center space-x-6 border-b pb-4">
          <FaUserCircle className="text-gray-500 w-20 h-20" />
          <div>
            <h2 className="text-lg font-semibold text-black">{fullName}</h2>
            <p className="text-black">Administrator</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">Change Photo</button>
          </div>
        </div>
        
        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-black">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-black">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-black">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block text-black">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Save Changes</motion.button>
      </div>
      
      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Change Password</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Update Password</motion.button>
      </div>
      
      {/* Account Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Account Preferences</h2>
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-black">Email Notifications</span>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span className={`transform transition ease-in-out duration-200 inline-block w-4 h-4 bg-white rounded-full ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </Switch>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-black">Two-Factor Authentication</span>
          <Switch
            checked={twoFactor}
            onChange={setTwoFactor}
            className={`${twoFactor ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable 2FA</span>
            <span className={`transform transition ease-in-out duration-200 inline-block w-4 h-4 bg-white rounded-full ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
          </Switch>
        </div>
      </div>
    </div>
  );
}