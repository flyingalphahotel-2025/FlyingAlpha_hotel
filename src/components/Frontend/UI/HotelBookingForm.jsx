"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

const HotelBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    checkInDate: "",
    checkOutDate: "",
    coupon: "",
    noOfPersons: "",
    noOfRooms: "",
    roomType: "Executive", 
    totalPrice: ""
  });

  const images = [
    "/Hotels/Bedroom2.jpg",
    "/Hotels/Bedroom1.jpg",
    "/Hotels/Bedroom4.jpg",
    "/Hotels/Reception.jpeg",
    "/Hotels/building.jpg",
    "/Hotels/gate2.jpeg",
    "/Hotels/gate.jpg",
    "/Hotels/gallery.jpeg",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    const { roomType, noOfPersons, noOfRooms } = formData;
    let basePrice = 0;
    let extraPersonCharge = 0;

    if (roomType === "Executive") {
      basePrice = noOfPersons <= 2 ? 1200 : 1600; // ₹1200 for single/double, ₹1600 for extra persons
      extraPersonCharge = noOfPersons > 2 ? (noOfPersons - 2) * 600 : 0; // ₹600 per extra person
    } else if (roomType === "Deluxe") {
      basePrice = noOfPersons <= 2 ? 1600 : 1800; // ₹1600 for single/double, ₹1800 for extra persons
      extraPersonCharge = noOfPersons > 2 ? (noOfPersons - 2) * 600 : 0; // ₹600 per extra person
    }

    const total = (basePrice + extraPersonCharge) * noOfRooms;
    setTotalPrice(total);
  };

  // Recalculate total price whenever form data changes
useEffect(() => {
  calculateTotalPrice();
  setFormData((prevData) => ({
    ...prevData,
    totalPrice: totalPrice, // Update total price in form data
  }));
}, [formData.roomType, formData.noOfPersons, formData.noOfRooms, totalPrice]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const applyCoupon = () => {
    if (formData.coupon === "WELCOME75") {
      setAppliedCoupon("WELCOME75");
      setSavings(1708);
      setTotalPrice(totalPrice - 1708); // Apply discount
    } else {
      setAppliedCoupon("");
      setSavings(0);
      calculateTotalPrice(); // Reset to original price
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const imagesToShow = showAll ? images : images.slice(0, 4);

  return (
    <div className="py-5 bg-gray-100 flex justify-center items-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Image Slider and Thumbnails */}
        <div className="w-full md:w-1/2 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail Column (Desktop) */}
            <motion.div
              className="hidden md:flex flex-col gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {imagesToShow.map((image, index) => (
                <motion.div
                  key={index}
                  className="w-20 h-20 overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))}

              {/* Show More / Show Less Button */}
              {images.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center justify-center mt-2 text-blue-500 hover:text-blue-700"
                >
                  {showAll ? (
                    <>
                      <FaChevronUp className="mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <FaChevronDown className="mr-2" />
                      Show More
                    </>
                  )}
                </button>
              )}
            </motion.div>

            {/* Preview Image Container */}
            <motion.div
              className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Preview Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />

              {/* Mobile Slider Controls */}
              <motion.div
                className="flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-4 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={prevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 rounded-full shadow-lg"
                >
                  <FaRegArrowAltCircleLeft className="text-2xl text-gray-800" />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 rounded-full shadow-lg"
                >
                  <FaRegArrowAltCircleRight className="text-2xl text-gray-800" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div className="w-full md:w-1/2 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Heading and Description */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Stay</h1>
            <p className="text-gray-600 mb-6">
              Experience luxury and comfort like never before. Fill out the form below to reserve your stay with us.
            </p>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  required
                />
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setIsOpen(true)}
                disabled={!formData.name || !formData.email}
                className={`w-full py-3 rounded-lg transition-all shadow-lg ${
                  formData.name && formData.email
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>

              {/* Share Icon */}
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => alert("Share this page!")}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-all"
                >
                  <FaShareAlt className="mr-2" />
                  <span className="text-sm font-medium">Share this offer</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Check-In Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Check-Out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* No. of Persons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. of Persons</label>
              <input
                type="number"
                name="noOfPersons"
                value={formData.noOfPersons}
                onChange={handleChange}
                placeholder="Enter number of persons"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* No. of Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. of Rooms</label>
              <input
                type="number"
                name="noOfRooms"
                value={formData.noOfRooms}
                onChange={handleChange}
                placeholder="Enter number of rooms"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Room Type Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="roomType"
                    value="Executive"
                    checked={formData.roomType === "Executive"}
                    onChange={handleChange}
                    className="focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">Executive Room</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="roomType"
                    value="Deluxe"
                    checked={formData.roomType === "Deluxe"}
                    onChange={handleChange}
                    className="focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">Deluxe Room</span>
                </label>
              </div>
            </div>

            {/* Complimentary Breakfast and Free Wi-Fi */}
            <p className="text-sm text-gray-600">
              Complimentary breakfast will be provided.
            </p>
            <p className="text-sm text-gray-600">
              Free Wi-Fi is available in all rooms.
            </p>

           {/* Total Price */}
        <p className="text-lg font-semibold text-gray-800">
          Total Price: ₹{totalPrice}
        </p>
            {/* Confirm Booking Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>

          {/* Close Button */}
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