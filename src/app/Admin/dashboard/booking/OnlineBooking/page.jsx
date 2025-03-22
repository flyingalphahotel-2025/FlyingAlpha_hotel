"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaPrint } from "react-icons/fa";
// import GenerateInvoice from "@/components/adminPanel/ui/GenerateInvoice";
import { FaTimes } from "react-icons/fa"; // Importing the React Icon for close
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const router = useRouter();

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking");
        if (Array.isArray(response.data.bookings)) {
          console.log(response.data.bookings)
          setBookings(response.data.bookings);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loader or No Bookings State
  if (loading) {
    return <Loader />;
  }

  if (!bookings.length) {
    return <p className="text-center text-gray-600">No bookings available.</p>;
  }

  // Open full-screen modal
  const handleOpenModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  // Close full-screen modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleNavigate = (bookingId) => {
    router.push(`bookings/${bookingId}`);
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg h-[80vh] min-w-[100%] mx-auto mt-4">
      <div className="flex justify-between px-4 py-2 bg-gray-200 text-black rounded-md my-4 font-medium">
        <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
      </div>
      {/* Wrapper with horizontal and vertical scrollbars */}
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] custom-scrollbar">
        <table className="border-collapse border border-gray-300 min-w-[1400px] text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-left">Sl. No</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Booking ID</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Customer Name</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Customer's MobileNo.</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Customer's Email</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Check-In Date</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Check-Out Date</th>
              <th className="border border-gray-300 px-2 py-1 text-left">No. of Persons</th>
              <th className="border border-gray-300 px-2 py-1 text-left">No. of Rooms</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Room Type</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Total Price</th>
              <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                <td className="border border-gray-300 px-2 py-1 truncate">{booking._id}</td>
                <td className="border border-gray-300 px-2 py-1 truncate">{booking.user?.fullName || "N/A"}</td>
                <td className="border border-gray-300 px-2 py-1 truncate">{booking.user?.mobileNumber || "N/A"}</td>
                <td className="border border-gray-300 px-2 py-1 truncate">{booking.user?.email || "N/A"}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {new Date(booking.checkInDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {new Date(booking.checkOutDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="border border-gray-300 px-2 py-1">{booking.noOfPersons}</td>
                <td className="border border-gray-300 px-2 py-1">{booking.noOfRooms}</td>
                <td className="border border-gray-300 px-2 py-1">{booking.roomType}</td>
                <td className="border border-gray-300 px-2 py-1">₹{booking.price}</td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleNavigate(booking._id)} // Open modal for full-screen invoice
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleOpenModal(booking._id)} 
                      className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-xs"
                    >
                      <FaPrint />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(Math.ceil(bookings.length / itemsPerPage)).keys()].map((number) => (
          <button
            key={number}
            className={`px-2 py-1 rounded-md text-xs ${
              currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full h-full max-h-screen p-4 overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-10 text-white bg-red-500 rounded-full p-2 hover:bg-red-600"
            >
              <FaTimes />
            </button>
            {/* Add GenerateInvoice Component with the bookingId */}
            {/* <GenerateInvoice bookingId={selectedBookingId} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;