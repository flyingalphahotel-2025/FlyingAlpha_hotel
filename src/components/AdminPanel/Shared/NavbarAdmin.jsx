"use client";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io"; // For the hamburger menu
import { IoMdLogOut } from "react-icons/io"; // For the logout icon
import Image from "next/image";
import logo from "../../../../public/Logo/FlyingAlpha.jpg";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Logout successful!");
        router.push("/");
      } else {
        toast.error(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <nav className="bg-gray-200 text-black transition-colors duration-300 shadow-lg">
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* <Image src={logo} alt="Logo" className="w-[80px] h-auto mr-4" /> */}
          <span className="text-3xl font-bold text-black custom-fontHemgjord">
            Flying Alpha Super Admin Panel
          </span>
        </div>

        {/* Hamburger Menu for Mobile View */}
        <div className="block lg:hidden">
          <button className="text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 duration-200">
            <IoIosMenu />
          </button>
        </div>

        {/* Right Section: Logout Icon */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
            onClick={handleLogout}
          >
            <IoMdLogOut className="text-xl" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
