import React from "react";
import { FaUserFriends, FaChild, FaUtensils, FaHotel, FaBroom, FaCoffee } from "react-icons/fa";

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            Why Choose <span className="text-[#FF0080]">Flying Alpha Hotel?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience comfort, luxury, and the best hospitality for all.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature Cards */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-blue-600 text-5xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

// Features Data
const features = [
  {
    icon: <FaUserFriends className="drop-shadow-lg" />,
    title: "Couples Friendly",
    description: "Enjoy a private and comfortable stay with premium amenities.",
  },
  {
    icon: <FaHotel className="drop-shadow-lg" />,
    title: "Family Friendly",
    description: "Spacious rooms and family suites for a perfect stay.",
  },
  {
    icon: <FaChild className="drop-shadow-lg" />,
    title: "Child Friendly",
    description: "Safe play areas and special services for kids.",
  },
  {
    icon: <FaBroom className="drop-shadow-lg" />,
    title: "Neat & Clean",
    description: "Hygienic environment with daily housekeeping services.",
  },
  {
    icon: <FaUtensils className="drop-shadow-lg" />,
    title: "Food Available",
    description: "Delicious multi-cuisine meals available 24/7.",
  },
  {
    icon: <FaCoffee className="drop-shadow-lg" />,
    title: "Free Breakfast",
    description: "Enjoy a complimentary breakfast from 8 AM to 10 PM.",
  },
];

export default Testimonial;
