import React from "react";
import { FaSnowflake, FaWifi, FaTv, FaFire, FaBatteryFull, FaUtensils } from "react-icons/fa";

export default function Amenities() {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 bg-blue-600">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
            FlyingAlpha Amenities
          </h1>
          <p className="mt-2 text-base sm:text-lg text-blue-200 text-center">
            Experience luxury and comfort with our exceptional amenities.
          </p>
        </div>

        {/* Amenities Section */}
        <div className="p-6 sm:p-8 bg-gray-50">
          <div className="flex gap-10 justify-around flex-wrap">
            {/* Amenities Items */}
            {[
              { icon: <FaSnowflake className="text-4xl text-blue-500" />, label: "AC" },
              { icon: <FaWifi className="text-4xl text-green-500" />, label: "Free Wifi" },
              { icon: <FaTv className="text-4xl text-purple-500" />, label: "TV" },
              { icon: <FaFire className="text-4xl text-red-500" />, label: "Geyser" },
              { icon: <FaBatteryFull className="text-4xl text-yellow-500" />, label: "Power Backup" },
              { icon: <FaUtensils className="text-4xl text-orange-500" />, label: "Free Breakfast" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
