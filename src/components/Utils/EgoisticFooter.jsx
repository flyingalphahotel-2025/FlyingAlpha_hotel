"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../Frontend/Shared/Footer';


const EgoisticFooter = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');


  if (isAdminPage ) {
    return null; 
  }

  return <Footer />;
};

export default EgoisticFooter;
