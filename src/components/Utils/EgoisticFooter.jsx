"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../Frontend/Shared/Footer';


const EgoisticFooter = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/Admin/dashboard');
  const isUserPage = pathname.startsWith('/user');
//   const isUserPage = pathname.startsWith('/user');
//   const isBranchPage = pathname.startsWith('/branch');

  if (isAdminPage || isUserPage) {
    return null; 
  }

  return <Footer />;
};

export default EgoisticFooter;
