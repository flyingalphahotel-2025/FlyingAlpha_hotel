"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, Printer, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Loader from "@/components/Loader/loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking");
        if (Array.isArray(response.data.bookings)) {
          console.log(response.data.bookings);
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
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">No bookings available.</p>
        </CardContent>
      </Card>
    );
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
    <Card className="w-full h-[80vh] bg-white shadow-lg">
      <CardHeader className="bg-gray-100 rounded-t-lg py-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Booking Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] border rounded">
          <Table className="min-w-[1400px]">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Sl. No</TableHead>
                <TableHead className="font-semibold">Booking ID</TableHead>
                <TableHead className="font-semibold">Customer Name</TableHead>
                <TableHead className="font-semibold">Customer's Mobile No.</TableHead>
                <TableHead className="font-semibold">Customer's Email</TableHead>
                <TableHead className="font-semibold">Check-In Date</TableHead>
                <TableHead className="font-semibold">Check-Out Date</TableHead>
                <TableHead className="font-semibold">No. of Persons</TableHead>
                <TableHead className="font-semibold">No. of Rooms</TableHead>
                <TableHead className="font-semibold">Room Type</TableHead>
                <TableHead className="font-semibold">Total Price</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.map((booking, index) => (
                <TableRow key={booking._id} className="hover:bg-gray-50">
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell className="max-w-[100px] truncate">{booking._id}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {booking.user?.fullName || "N/A"}
                  </TableCell>
                  <TableCell className="max-w-[120px] truncate">
                    {booking.user?.mobileNumber || "N/A"}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {booking.user?.email || "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkInDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkOutDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{booking.noOfPersons}</TableCell>
                  <TableCell>{booking.noOfRooms}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>₹{booking.price}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => handleNavigate(booking._id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-purple-500 text-white hover:bg-purple-600"
                        onClick={() => handleOpenModal(booking._id)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        <Pagination className="mt-4">
          <PaginationContent>
            {[...Array(Math.ceil(bookings.length / itemsPerPage)).keys()].map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={currentPage === number + 1}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </CardContent>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full h-full max-h-screen p-6 overflow-y-auto relative">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              onClick={handleCloseModal}
            >
              <X className="h-4 w-4" />
            </Button>
            {/* Placeholder for invoice component */}
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Invoice component will be rendered here</p>
              {/* Replace with your invoice component: */}
              {/* <GenerateInvoice bookingId={selectedBookingId} /> */}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Bookings;