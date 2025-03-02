import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import { Toaster } from 'react-hot-toast';
import SidebarAdmin from '@/components/AdminPanel/Shared/SidebarAdmin';
import NavbarAdmin from '@/components/AdminPanel/Shared/NavbarAdmin';

const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAdmin className="w-1/4 h-screen bg-gray-800" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Navbar */}
        <NavbarAdmin className="w-full" />

        {/* Page Content */}
        {children}
      </div>

      {/* React Hot Toaster */}
      <Toaster
        position="top-right" // Position of the toasts
        toastOptions={{
          duration: 3000, // Duration of the toast in milliseconds
          style: {
            background: '#363636', // Background color
            color: '#fff', // Text color
          },
          success: {
            iconTheme: {
              primary: '#4CAF50', // Success icon color
              secondary: '#fff', // Success icon background
            },
          },
          error: {
            iconTheme: {
              primary: '#FF5252', // Error icon color
              secondary: '#fff', // Error icon background
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;