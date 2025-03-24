"use client"
import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import { Toaster } from 'react-hot-toast';
import SidebarAdmin from '@/components/AdminPanel/Shared/SidebarAdmin';
import NavbarAdmin from '@/components/AdminPanel/Shared/NavbarAdmin';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex w-full min-h-screen overflow-hidden bg-white">
        {/* Sidebar */}
        <SidebarAdmin className="w-1/4 h-screen bg-white" />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto flex flex-col">
          {/* Navbar */}
          <NavbarAdmin className="w-full" />

          {/* Page Content */}
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>

      {/* React Hot Toaster - moved outside the flex container */}
      <Toaster
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF5252',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
};

export default Layout;