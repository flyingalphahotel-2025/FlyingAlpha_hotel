"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';



const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('/api/auth/signIn', {
        email,
        password,
        rememberMe,
      });
  
      if (response.status === 200) {
        // Clear the form fields
        setEmail('');
        setPassword('');
        setRememberMe(false);
  
        console.log("redirecting to the admin panel");
        router.push('/admin/dashboard');
        console.log("redirected");
      }
    } catch (error) {
      console.error(error);
      // Show an error toast if the login fails
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 px-6 md:px-12">
    <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl rounded-xl p-8 md:p-10 my-5">
      {/* Animated Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center md:items-start"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold mb-6 text-center md:text-left text-blue-800 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome Back to <span className="text-blue-700">Flying Alpha Hotel Admin</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-center md:text-left text-gray-600 mb-8"
        >
          <span className="underline decoration-dotted text-blue-600">
            Access your admin dashboard
          </span>{" "}
          to manage hotel operations efficiently.
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <label className="block text-black font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your email"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="relative"
        >
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your password"
            required
          />
          <div
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer mt-7"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye className="text-gray-500 " />
            ) : (
              <FaEyeSlash className="text-gray-500" />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center space-x-3"
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="accent-blue-600 w-5 h-5"
          />
          <label className="text-gray-700">Remember Me</label>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-5 text-lg font-medium text-white rounded-lg shadow-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </form>

      {/* Links Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-between mt-6 text-sm text-gray-600 font-semibold"
      >
        <a
          href="/auth/forgotPassword"
          className="hover:text-blue-700 hover:underline transition font-semibold"
        >
          Forgot your password?
        </a>
        <a
          href="/admin/auth/signUp"
          className="hover:text-blue-700 hover:underline transition"
        >
          Register here
        </a>
      </motion.div>
    </div>
  </div>
);
};

export default AdminLoginForm;