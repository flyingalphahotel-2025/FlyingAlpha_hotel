"use client"
import React from 'react';
import { FaHotel, FaUtensils, FaSwimmer, FaWifi, FaLeaf, FaMapMarkerAlt, FaUsers, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Hotel O Flying Alpha</h1>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <p className="text-gray-600">
              Welcome to Hotel O Flying Alpha, where luxury meets comfort. Established in 2020, we have been providing
              exceptional hospitality services to our guests. Our mission is to create unforgettable experiences for
              everyone who walks through our doors.
            </p>
          </div>

          {/* Our Facilities */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Facilities</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaHotel className="text-blue-500 text-2xl mr-4" />
                <p className="text-gray-600">Luxurious Rooms and Suites</p>
              </div>
              <div className="flex items-center">
                <FaUtensils className="text-blue-500 text-2xl mr-4" />
                <p className="text-gray-600">Fine Dining Restaurants</p>
              </div>
              <div className="flex items-center">
                <FaSwimmer className="text-blue-500 text-2xl mr-4" />
                <p className="text-gray-600">Swimming Pool</p>
              </div>
              <div className="flex items-center">
                <FaWifi className="text-blue-500 text-2xl mr-4" />
                <p className="text-gray-600">High-Speed Wi-Fi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12 hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            At Hotel O Flying Alpha, we envision a world where every guest feels at home, no matter where they are. We strive to
            redefine luxury by offering personalized services, state-of-the-art facilities, and a commitment to excellence in
            everything we do.
          </p>
        </div>

        {/* Our Team */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12 hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
          <p className="text-gray-600">
            Our team of dedicated professionals is the backbone of Hotel O Flying Alpha. From our chefs to our housekeeping staff,
            everyone is committed to ensuring that your stay is nothing short of perfect. We believe in the power of teamwork and
            the importance of every individual's contribution.
          </p>
          <div className="flex items-center mt-4">
            <FaUsers className="text-blue-500 text-2xl mr-4" />
            <p className="text-gray-600">Experienced and Friendly Staff</p>
          </div>
        </div>

        {/* Guest Reviews */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12 hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Guest Reviews</h2>
          <p className="text-gray-600">
            Don't just take our word for it! Here's what some of our guests have to say about their experience at Hotel O Flying Alpha:
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 text-2xl mr-4" />
              <p className="text-gray-600">"The best hotel experience I've ever had! The staff was incredibly welcoming."</p>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 text-2xl mr-4" />
              <p className="text-gray-600">"The rooms are spacious and luxurious, and the food is to die for!"</p>
            </div>
          </div>
        </div>

        {/* Sustainability Initiatives */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12 hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sustainability Initiatives</h2>
          <p className="text-gray-600">
            At Hotel O Flying Alpha, we are committed to sustainability and reducing our environmental footprint. From energy-efficient
            lighting to waste reduction programs, we are dedicated to preserving the planet for future generations.
          </p>
          <div className="flex items-center mt-4">
            <FaLeaf className="text-green-500 text-2xl mr-4" />
            <p className="text-gray-600">Eco-Friendly Practices</p>
          </div>
        </div>

        {/* Location & Accessibility */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Location & Accessibility</h2>
          <p className="text-gray-600">
            Located in the heart of the city, Hotel O Flying Alpha is easily accessible from major transportation hubs. Whether you're
            traveling for business or leisure, our prime location ensures that you're never far from where you need to be.
          </p>
          <div className="flex items-center mt-4">
            <FaMapMarkerAlt className="text-blue-500 text-2xl mr-4" />
            <p className="text-gray-600">Conveniently Located in the City Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;