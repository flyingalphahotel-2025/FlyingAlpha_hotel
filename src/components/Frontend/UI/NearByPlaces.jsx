"use client"
import { motion } from "framer-motion";

const NearbyPlaces = () => {
  return (
    <div className="bg-gray-100  py-10 px-5 md:px-20">
      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore Nearby Attractions 🚀
      </motion.h1>

      {/* Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Places to Visit */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-blue-500 mb-4">
            🏛️ Places to Visit
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>🔹 <strong>Golghar:</strong> A historic granary offering panoramic views.</li>
            <li>🔹 <strong>Patna Museum:</strong> Showcasing Bihar’s rich history.</li>
            <li>🔹 <strong>Buddha Smriti Park:</strong> A peaceful spot dedicated to Buddha.</li>
          </ul>
        </motion.div>

        {/* Transportation */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            🚆 Transportation
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>🔹 <strong>Patna Junction Railway Station:</strong> Major railway hub.</li>
            <li>🔹 <strong>Jay Prakash Narayan Airport:</strong> The main airport in Patna.</li>
            <li>🔹 <strong>Local Transport:</strong> Auto-rickshaws, taxis, and buses available.</li>
          </ul>
        </motion.div>

        {/* Restaurants */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            🍽️ Restaurants Nearby
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>🔹 <strong>Annapurna Bhandar:</strong> Famous for Bengali sweets.</li>
            <li>🔹 <strong>Bikaner Sweet Shop:</strong> Try their delicious rasmalai.</li>
            <li>🔹 <strong>Giani’s:</strong> Popular for Rabri Falooda & ice creams.</li>
          </ul>
        </motion.div>
      </div>

      {/* Hotel Link */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <a
          href="https://www.oyorooms.com/288558/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Book Your Stay at Hotel O Flying Alpha 🏨
        </a>
      </motion.div>
    </div>
  );
};

export default NearbyPlaces;
