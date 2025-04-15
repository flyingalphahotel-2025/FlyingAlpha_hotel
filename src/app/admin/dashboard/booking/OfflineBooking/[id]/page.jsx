"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { 
  Save, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Home, 
  CreditCard, 
  CheckSquare,
  User,
  Mail,
  Phone,
  AlertTriangle,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BookingDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(null);

  // Booking form fields
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    noOfPersons: 0,
    noOfRooms: 0,
    roomNumbers: [],
    roomType: "",
    totalPrice: 0,
    paidAmount: 0,
    leftAmount: 0,
    paymentStatus: "",
    paymentMethod: "",
    specialRequests: "",
    purpose: "",
    bookingStatus: "",
  });

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/offlineBooking/${id}`);
        setBooking(response.data.booking);
        
        // Format dates for form inputs
        const checkInDate = new Date(response.data.booking.checkInDate);
        const checkOutDate = new Date(response.data.booking.checkOutDate);
        
        setFormData({
          checkInDate: format(checkInDate, "yyyy-MM-dd"),
          checkInTime: response.data.booking.checkInTime || "12:00",
          checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
          checkOutTime: response.data.booking.checkOutTime || "11:00",
          noOfPersons: response.data.booking.noOfPersons,
          noOfRooms: response.data.booking.noOfRooms,
          roomNumbers: response.data.booking.roomNumbers || [],
          roomType: response.data.booking.roomType,
          totalPrice: response.data.booking.totalPrice,
          paidAmount: response.data.booking.paidAmount,
          leftAmount: response.data.booking.leftAmount,
          paymentStatus: response.data.booking.paymentStatus,
          paymentMethod: response.data.booking.paymentMethod,
          specialRequests: response.data.booking.specialRequests || "",
          purpose: response.data.booking.purpose || "",
          bookingStatus: response.data.booking.bookingStatus,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      
      // Recalculate leftAmount when totalPrice or paidAmount changes
      if (name === "totalPrice" || name === "paidAmount") {
        updatedData.leftAmount = Number(updatedData.totalPrice) - Number(updatedData.paidAmount);
      }
      
      return updatedData;
    });
    
    setIsDirty(true);
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  // Handle room number changes
  const handleRoomNumberChange = (index, value) => {
    const updatedRoomNumbers = [...formData.roomNumbers];
    updatedRoomNumbers[index] = value;
    
    setFormData((prev) => ({
      ...prev,
      roomNumbers: updatedRoomNumbers,
    }));
    
    setIsDirty(true);
  };

  // Add new room number
  const addRoomNumber = () => {
    setFormData((prev) => ({
      ...prev,
      roomNumbers: [...prev.roomNumbers, `Room ${prev.roomNumbers.length + 1}`],
      noOfRooms: prev.noOfRooms + 1,
    }));
    
    setIsDirty(true);
  };

  // Remove room number
  const removeRoomNumber = (index) => {
    const updatedRoomNumbers = [...formData.roomNumbers];
    updatedRoomNumbers.splice(index, 1);
    
    setFormData((prev) => ({
      ...prev,
      roomNumbers: updatedRoomNumbers,
      noOfRooms: prev.noOfRooms - 1,
    }));
    
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Format dates back to ISO format
      const updatedBooking = {
        ...formData,
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString(),
      };
      
      const response = await axios.put(`/api/offlineBooking/${id}`, updatedBooking);
      
      if (response.data.success) {
        toast.success("Booking updated successfully");
        setIsDirty(false);
        
        // Refresh booking data
        const refreshResponse = await axios.get(`/api/offlineBooking/${id}`);
        setBooking(refreshResponse.data.booking);
      } else {
        toast.error(response.data.message || "Failed to update booking");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error("Failed to update booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to bookings list
  const handleGoBack = () => {
    router.push("/offlinebooking");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading booking details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
        </Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Booking not found.</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
        </Button>
      </div>
    );
  }

  // Get badge color for booking status
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get badge color for payment status
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
        </Button>
        
        {isDirty && (
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Booking Info Card */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Booking Details</CardTitle>
                <p className="text-sm text-gray-500">ID: {booking.bookingId}</p>
              </div>
              <Badge className={`${getStatusColor(booking.bookingStatus)} text-white`}>
                {booking.bookingStatus}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="checkInDate" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Check-In Date
                  </Label>
                  <Input
                    id="checkInDate"
                    name="checkInDate"
                    type="date"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="checkInTime" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Check-In Time
                  </Label>
                  <Input
                    id="checkInTime"
                    name="checkInTime"
                    type="time"
                    value={formData.checkInTime}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="checkOutDate" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Check-Out Date
                  </Label>
                  <Input
                    id="checkOutDate"
                    name="checkOutDate"
                    type="date"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="checkOutTime" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Check-Out Time
                  </Label>
                  <Input
                    id="checkOutTime"
                    name="checkOutTime"
                    type="time"
                    value={formData.checkOutTime}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="noOfPersons" className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> Number of Persons
                  </Label>
                  <Input
                    id="noOfPersons"
                    name="noOfPersons"
                    type="number"
                    min="1"
                    value={formData.noOfPersons}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="noOfRooms" className="flex items-center gap-1">
                    <Home className="h-4 w-4" /> Number of Rooms
                  </Label>
                  <Input
                    id="noOfRooms"
                    name="noOfRooms"
                    type="number"
                    min="1"
                    value={formData.noOfRooms}
                    onChange={handleChange}
                    className="mt-1"
                    disabled
                  />
                </div>
                
                <div>
                  <Label htmlFor="roomType" className="flex items-center gap-1">
                    <Home className="h-4 w-4" /> Room Type
                  </Label>
                  <Select
                    value={formData.roomType}
                    onValueChange={(value) => handleSelectChange("roomType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Deluxe">Deluxe</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Room Numbers */}
              <div className="mb-6">
                <Label className="flex items-center gap-1 mb-2">
                  <Home className="h-4 w-4" /> Room Numbers
                </Label>
                
                {formData.roomNumbers.map((roomNumber, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={roomNumber}
                      onChange={(e) => handleRoomNumberChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeRoomNumber(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRoomNumber}
                  className="mt-2"
                >
                  Add Room
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              {/* Payment Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="totalPrice" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Total Price (₹)
                  </Label>
                  <Input
                    id="totalPrice"
                    name="totalPrice"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="paidAmount" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Paid Amount (₹)
                  </Label>
                  <Input
                    id="paidAmount"
                    name="paidAmount"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="leftAmount" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Balance Amount (₹)
                  </Label>
                  <Input
                    id="leftAmount"
                    name="leftAmount"
                    type="number"
                    value={formData.leftAmount}
                    className="mt-1"
                    disabled
                  />
                </div>
                
                <div>
                  <Label htmlFor="paymentMethod" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Payment Method
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="paymentStatus" className="flex items-center gap-1">
                    <CheckSquare className="h-4 w-4" /> Payment Status
                  </Label>
                  <Select
                    value={formData.paymentStatus}
                    onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bookingStatus" className="flex items-center gap-1">
                    <CheckSquare className="h-4 w-4" /> Booking Status
                  </Label>
                  <Select
                    value={formData.bookingStatus}
                    onValueChange={(value) => handleSelectChange("bookingStatus", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select booking status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Additional Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="purpose" className="flex items-center gap-1">
                    Purpose of Stay
                  </Label>
                  <Input
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialRequests" className="flex items-center gap-1">
                    Special Requests
                  </Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Customer Info Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              {booking.users && booking.users.length > 0 ? (
                booking.users.map((user, index) => (
                  <div key={user._id} className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">Guest {index + 1}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{user.fullName}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{user.email}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{user.mobileNumber}</span>
                      </div>
                    </div>
                    
                    {index < booking.users.length - 1 && <Separator className="my-4" />}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No customer information available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="font-medium">{booking.bookingId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>{format(new Date(booking.createdAt), "MMM dd, yyyy")}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <Badge className={`${getStatusColor(booking.bookingStatus)} text-white`}>
                    {booking.bookingStatus}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Price:</span>
                  <span className="font-medium">₹{booking.totalPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Paid Amount:</span>
                  <span className="text-green-600">₹{booking.paidAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Balance:</span>
                  <span className="text-red-600">₹{booking.leftAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  <Badge className={`${getPaymentStatusColor(booking.paymentStatus)} text-white`}>
                    {booking.paymentStatus}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span>{booking.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;