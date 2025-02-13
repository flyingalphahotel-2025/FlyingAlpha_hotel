"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import logo from '../../../../public/Logo/FlyingAlpha.jpg'
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header class="py-4 bg-black sm:py-6" x-data="{expanded: false}">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <div class="shrink-0">
                    <a href="#" title="" class="flex">
                        <img class="w-auto h-9" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg" alt="" />
                    </a>
                </div>

                <div class="flex md:hidden">
                    <button type="button" class="text-white" @click="expanded = !expanded" :aria-expanded="expanded">
                        <span x-show="!expanded" aria-hidden="true">
                            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </span>

                        <span x-show="expanded" aria-hidden="true">
                            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                </div>

                <nav class="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>
                </nav>

                <div class="relative hidden md:items-center md:justify-center md:inline-flex group">
                    <div class="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <a href="#" title="" class="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a>
                </div>
            </div>

            <nav x-show="expanded" x-collapse>
                <div class="flex flex-col pt-8 pb-4 space-y-6">
                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>

                    <a href="#" title="" class="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>

                    <div class="relative inline-flex items-center justify-center group">
                        <div class="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                        <a href="#" title="" class="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a>
                    </div>
                </div>
            </nav>
        </div>
    </header>
  );
};

export default Navbar;