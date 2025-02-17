"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Frontend/Shared/Navbar';

const EgoisticNavbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isUserPage = pathname.startsWith('/user');


  if (isAdminPage || isUserPage ) {
    return null; 
  }

  return <Navbar />;
};

export default EgoisticNavbar;
