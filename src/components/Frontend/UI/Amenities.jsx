import React from "react";
import { FaSwimmingPool, FaWifi, FaTv, FaSnowflake, FaBatteryFull, FaFire, FaUtensils } from "react-icons/fa";

const Amenities = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 bg-blue-600">
          <h1 className="text-4xl font-bold text-white text-center">
          FlyingAlpha Amenities 
          </h1>
          <p className="mt-2 text-lg text-blue-200 text-center">
            Experience luxury and comfort with our exceptional amenities.
          </p>
        </div>

        {/* Amenities Section */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* AC */}
            <div className="text-center">
              <div className="flex justify-center">
                <FaSnowflake className="text-4xl text-blue-500" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">AC</h3>
            </div>

            {/* Free Wifi */}
            <div className="text-center">
              <div className="flex justify-center">
                <FaWifi className="text-4xl text-green-500" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">Free Wifi</h3>
            </div>

            {/* TV */}
            <div className="text-center">
              <div className="flex justify-center">
                <FaTv className="text-4xl text-purple-500" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">TV</h3>
            </div>

            {/* Geyser */}
            <div className="text-center">
              <div className="flex justify-center">
                <FaFire className="text-4xl text-red-500" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">Geyser</h3>
            </div>

            {/* Power Backup */}
            <div className="text-center">
              <div className="flex justify-center">
                <FaBatteryFull className="text-4xl text-yellow-500" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">Power Backup</h3>
            </div>
          {/* Free Breakfast  */}
            <div className="text-center">
      <div className="flex justify-center">
        <FaUtensils className="text-4xl text-orange-500" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-800">Free Breakfast</h3>
    </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Amenities;