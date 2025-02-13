"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const HotelBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    checkInDate: "",
    checkOutDate: "",
    coupon: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(4065);
  const [savings, setSavings] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const applyCoupon = () => {
    if (formData.coupon === "WELCOME75") {
      setAppliedCoupon("WELCOME75");
      setSavings(1708);
      setTotalPrice(1138);
    } else {
      setAppliedCoupon("");
      setSavings(0);
      setTotalPrice(4065);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-[20vh] bg-gray-100 flex justify-center items-center  w-full">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="w-full  bg-white rounded-lg shadow-lg p-6"
>
  <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Book Your Stay</h1>
  
  {/* Initial Fields */}
  <div className="flex gap-4 items-end flex-col md:flex-row"> {/* Use flex and gap for horizontal layout */}
    <div className="flex-1">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full px-4 py-2 border  focus:ring-2 focus:ring-blue-500 rounded-2xl"
        required
      />
    </div>
    <div className="flex-1">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-2 border  focus:ring-2 focus:ring-blue-500  rounded-2xl"
        required
      />
    </div>
    <div className="flex-1">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full  bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  </div>
</motion.div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-50 fixed inset-0"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Complete Your Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                placeholder="Coupon Code"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-800">Total Price: ₹{totalPrice}</p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </motion.div>
      </Dialog>
    </div>
  );
};

export default HotelBookingForm;
