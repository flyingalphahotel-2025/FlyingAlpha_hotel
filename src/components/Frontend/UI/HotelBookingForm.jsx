"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaShareAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

// Import ShadCn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

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
    totalPrice: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Function to calculate total price
  const calculateTotalPrice = () => {
    const { roomType, noOfPersons, noOfRooms } = formData;
    let basePrice = 0;
    let extraPersonCharge = 0;

    if (roomType === "Executive") {
      basePrice = noOfPersons <= 2 ? 1200 : 1600;
      extraPersonCharge = noOfPersons > 2 ? (noOfPersons - 2) * 600 : 0;
    } else if (roomType === "Deluxe") {
      basePrice = noOfPersons <= 2 ? 1600 : 1800;
      extraPersonCharge = noOfPersons > 2 ? (noOfPersons - 2) * 600 : 0;
    }

    const total = (basePrice + extraPersonCharge) * noOfRooms;
    setTotalPrice(total);
  };

  // Recalculate total price whenever form data changes
  useEffect(() => {
    calculateTotalPrice();
    setFormData((prevData) => ({
      ...prevData,
      totalPrice: totalPrice,
    }));
  }, [formData.roomType, formData.noOfPersons, formData.noOfRooms, totalPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number validation (only digits and max 10 characters)
    if (name === "mobile" && (value.length > 10 || !/^\d*$/.test(value))) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const applyCoupon = () => {
    if (formData.coupon === "WELCOME75") {
      setAppliedCoupon("WELCOME75");
      setSavings(1708);
      setTotalPrice(totalPrice - 1708);
    } else {
      setAppliedCoupon("");
      setSavings(0);
      calculateTotalPrice();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate check-in and check-out dates
    if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
      toast.error("Check-in date must be before check-out date.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Booking confirmed successfully!");
        setIsOpen(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          checkInDate: "",
          checkOutDate: "",
          coupon: "",
          noOfPersons: "",
          noOfRooms: "",
          roomType: "Executive",
          totalPrice: "",
        });
      } else {
        toast.error(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
    <div className="py-8 bg-gradient-to-b from-blue-50 to-purple-50 flex justify-center items-center p-4 min-h-[70vh]">
      <Toaster position="top-center" />
      
      <motion.div 
        className="w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="overflow-hidden border-none shadow-xl bg-white rounded-xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image Slider and Thumbnails */}
            <motion.div className="w-full md:w-1/2 p-6" variants={itemVariants}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail Column (Desktop) */}
                <motion.div
                  className="hidden md:flex flex-col gap-4"
                  variants={itemVariants}
                >
                  {imagesToShow.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`w-20 h-20 overflow-hidden rounded-lg shadow-md cursor-pointer ${
                        currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                      }`}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAll(!showAll)}
                      className="flex items-center justify-center mt-2 text-blue-600 hover:text-blue-800"
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
                    </Button>
                  )}
                </motion.div>

                {/* Preview Image Container */}
                <motion.div
                  className="w-full h-64 md:h-96 relative rounded-xl overflow-hidden shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Preview Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Image Navigation Controls */}
                  <motion.div
                    className="flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.button
                      onClick={prevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/80 rounded-full shadow-lg text-blue-600 hover:bg-white"
                    >
                      <FaRegArrowAltCircleLeft className="text-2xl" />
                    </motion.button>
                    <motion.button
                      onClick={nextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/80 rounded-full shadow-lg text-blue-600 hover:bg-white"
                    >
                      <FaRegArrowAltCircleRight className="text-2xl" />
                    </motion.button>
                  </motion.div>

                  {/* Image pagination indicator */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                      <motion.div 
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          currentImageIndex === index ? "bg-white" : "bg-white/50"
                        }`}
                        whileHover={{ scale: 1.5 }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Booking Form */}
            <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="p-0 mb-6">
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">Book Your Stay</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Experience luxury and comfort like never before. Fill out the form below to reserve your stay with us.
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </motion.div>

                {/* Special Offers */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg shadow-sm"
                >
                  <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 mb-2">Special Offer</Badge>
                  <p className="text-sm text-gray-800">Book now and get 10% off on dining during your stay!</p>
                </motion.div>

                {/* Book Now Button */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setIsOpen(true)}
                    disabled={!formData.name || !formData.email}
                    className="w-full py-6 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    Book Now
                  </Button>
                </motion.div>

                {/* Share Button */}
                <motion.div 
                  className="flex justify-center items-center mt-4"
                  variants={itemVariants}
                >
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-all"
                  >
                    <FaShareAlt className="mr-2" />
                    <span className="text-sm font-medium">Share this offer</span>
                  </Button>
                </motion.div>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Booking Dialog - Using ShadCn Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">Complete Your Booking</DialogTitle>
            <DialogDescription>
              Fill in the details below to confirm your reservation.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                maxLength={10}
                required
              />
            </div>

            {/* Check-In Date */}
            <div className="space-y-2">
              <Label htmlFor="checkInDate">Check-In Date</Label>
              <Input
                id="checkInDate"
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* Check-Out Date */}
            <div className="space-y-2">
              <Label htmlFor="checkOutDate">Check-Out Date</Label>
              <Input
                id="checkOutDate"
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                min={formData.checkInDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* No. of Persons */}
            <div className="space-y-2">
              <Label htmlFor="noOfPersons">No. of Persons</Label>
              <Input
                id="noOfPersons"
                type="number"
                name="noOfPersons"
                value={formData.noOfPersons}
                onChange={handleChange}
                placeholder="Enter number of persons"
                min="1"
                required
              />
            </div>

            {/* No. of Rooms */}
            <div className="space-y-2">
              <Label htmlFor="noOfRooms">No. of Rooms</Label>
              <Input
                id="noOfRooms"
                type="number"
                name="noOfRooms"
                value={formData.noOfRooms}
                onChange={handleChange}
                placeholder="Enter number of rooms"
                min="1"
                required
              />
            </div>

            {/* Room Type - Using standard HTML radio buttons instead of RadioGroup */}
            <div className="space-y-2">
              <Label>Room Type</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="executive"
                    name="roomType"
                    value="Executive"
                    checked={formData.roomType === "Executive"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="executive">Executive Room</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="deluxe"
                    name="roomType"
                    value="Deluxe"
                    checked={formData.roomType === "Deluxe"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="deluxe">Deluxe Room</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Included with your stay:</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="bg-white text-blue-600">Complimentary Breakfast</Badge>
                <Badge variant="outline" className="bg-white text-green-600">Free Wi-Fi</Badge>
                <Badge variant="outline" className="bg-white text-purple-600">Pool Access</Badge>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price:</span>
                <span>₹{totalPrice}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount:</span>
                  <span>-₹{savings}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span className="text-lg">₹{totalPrice - savings}</span>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelBookingForm;