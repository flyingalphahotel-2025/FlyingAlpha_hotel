"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, Printer, Search, Calendar } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AutoDownloadPDF } from "@/components/AdminPanel/InvoicePDF";

const OfflineBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const itemsPerPage = 8;
  const router = useRouter();

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/offlineBooking");
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
          setFilteredBookings(response.data.bookings);
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

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Filter bookings based on search term and status
  useEffect(() => {
    let results = bookings;
    
    if (searchTerm) {
      results = results.filter(booking => 
        booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter && statusFilter !== "all") {
      results = results.filter(booking => 
        booking.bookingStatus === statusFilter ||
        booking.paymentStatus === statusFilter
      );
    }
    
    setFilteredBookings(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, bookings]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (bookingId) => {
    router.push(`/admin/dashboard/booking/OfflineBooking/${bookingId}`);
  };

  const handlePrint = (bookingId) => {
    console.log("Print booking:", bookingId);
    setSelectedBookingId(bookingId);
    setIsPrinting(true);
    
    // Reset the states after a timeout to allow the download to complete
    setTimeout(() => {
      setIsPrinting(false);
      setSelectedBookingId(null);
    }, 2000);
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Partial":
        return "bg-yellow-500";
      case "Unpaid":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get booking status badge color
  const getBookingStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500";
      case "Pending":
        return "bg-blue-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-gray-800">
          Offline Booking Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search by Booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Partial">Partial Payment</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium">Booking ID</TableHead>
                <TableHead className="font-medium text-center">Users</TableHead>
                <TableHead className="font-medium">Created At</TableHead>
                <TableHead className="font-medium">Check In/Out</TableHead>
                <TableHead className="font-medium text-right">Total Amount</TableHead>
                <TableHead className="font-medium text-right">Paid/Balance</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <TableRow key={booking._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {booking.bookingId || booking._id.substring(0, 10)}
                    </TableCell>
                    <TableCell className="text-center">
                      {booking.users?.length || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDate(booking.createdAt)}</span>
                        <span className="text-xs text-gray-500">{formatTime(booking.createdAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-green-600">In:</span>
                          <span className="text-xs">{formatDate(booking.checkInDate)}</span>
                          <span className="text-xs text-gray-500">{booking.checkInTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-red-600">Out:</span>
                          <span className="text-xs">{formatDate(booking.checkOutDate)}</span>
                          <span className="text-xs text-gray-500">{booking.checkOutTime}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{booking.totalPrice || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-end">
                        <span className="text-green-600">₹{booking.paidAmount || 0}</span>
                        <span className="text-xs text-red-600">Balance: ₹{booking.leftAmount || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge className={`${getBookingStatusColor(booking.bookingStatus)} text-white`}>
                          {booking.bookingStatus || "N/A"}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-300">
                          {booking.paymentMethod || "N/A"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => handleView(booking._id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-purple-500 text-white hover:bg-purple-600"
                          onClick={() => handlePrint(booking._id)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredBookings.length > itemsPerPage && (
          <Pagination className="mt-4">
            <PaginationContent>
              {[...Array(Math.ceil(filteredBookings.length / itemsPerPage))].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
        
        {/* PDF Download Component */}
        {selectedBookingId && <AutoDownloadPDF bookingId={selectedBookingId} onComplete={() => setSelectedBookingId(null)} />}
      </CardContent>
    </Card>
  );
};

export default OfflineBookings;