"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/toast';

const OfflineBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    users: [],
    checkInDate: new Date(),
    checkInTime: '12:00',
    checkOutDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
    checkOutTime: '11:00',
    noOfPersons: 1,
    noOfRooms: 1,
    roomNumbers: [],
    roomType: 'Standard',
    selectedUsers: [],
    totalPrice: 0,
    paidAmount: 0,
    leftAmount: 0,
    paymentStatus: 'Pending',
    paymentMethod: 'Cash',
    specialRequests: '',
    purpose: '',
    bookingStatus: 'Confirmed',
  });

  const steps = [
    { id: 1, name: 'Guest Information' },
    { id: 2, name: 'Room & Booking Details' },
    { id: 3, name: 'Payment Information' },
    { id: 4, name: 'Review & Confirm' },
  ];

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
  const paymentMethods = ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Other'];
  const paymentStatuses = ['Pending', 'Paid', 'Partial', 'Refunded'];

  // Mock fetch users - replace with actual API call
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API call
        const response = await new Promise(resolve => 
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve([
                { _id: '1', fullName: 'John Doe', email: 'john@example.com', mobileNumber: '9876543210' },
                { _id: '2', fullName: 'Jane Smith', email: 'jane@example.com', mobileNumber: '8765432109' },
                { _id: '3', fullName: 'Alex Johnson', email: 'alex@example.com', mobileNumber: '7654321098' },
              ])
            });
          }, 1000)
        );
        
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const form = useForm({
    defaultValues: {
      // You can set your initial form values here
      noOfPersons: 1,
      noOfRooms: 1,
      roomType: 'Standard',
      paymentMethod: 'Cash',
      // ...other fields
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate left amount when totalPrice or paidAmount changes
      if (field === 'totalPrice' || field === 'paidAmount') {
        updated.leftAmount = updated.totalPrice - updated.paidAmount;
        
        // Auto-determine payment status
        if (updated.leftAmount <= 0) {
          updated.paymentStatus = 'Paid';
        } else if (updated.paidAmount > 0) {
          updated.paymentStatus = 'Partial';
        } else {
          updated.paymentStatus = 'Pending';
        }
      }
      
      return updated;
    });
  };

  const handleUserSelect = (userId) => {
    const selectedUser = users.find(user => user._id === userId);
    
    if (!selectedUser) return;
    
    setFormData(prev => {
      // Check if user is already selected
      const isAlreadySelected = prev.selectedUsers.some(user => user._id === userId);
      
      if (isAlreadySelected) {
        // Remove user if already selected
        return {
          ...prev,
          selectedUsers: prev.selectedUsers.filter(user => user._id !== userId),
          users: prev.users.filter(id => id !== userId),
        };
      } else {
        // Add user if not already selected
        return {
          ...prev,
          selectedUsers: [...prev.selectedUsers, selectedUser],
          users: [...prev.users, userId],
        };
      }
    });
  };

  const handleAddRoom = () => {
    setFormData(prev => ({
      ...prev,
      roomNumbers: [...prev.roomNumbers, `Room ${prev.roomNumbers.length + 1}`]
    }));
  };

  const handleRemoveRoom = (index) => {
    setFormData(prev => ({
      ...prev,
      roomNumbers: prev.roomNumbers.filter((_, i) => i !== index)
    }));
  };

  const handleRoomNumberChange = (index, value) => {
    setFormData(prev => {
      const updatedRoomNumbers = [...prev.roomNumbers];
      updatedRoomNumbers[index] = value;
      return {
        ...prev,
        roomNumbers: updatedRoomNumbers
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Replace with your actual API call
      const response = await new Promise(resolve => 
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({ success: true, bookingId: `#Alpha${Math.random().toString(36).substring(2, 12).toUpperCase()}` })
          });
        }, 2000)
      );
      
      const data = await response.json();
      
      toast({
        title: 'Booking Successful',
        description: `Booking created with ID: ${data.bookingId}`,
      });
      
      // Reset form or redirect
      setCurrentStep(1);
      setFormData({
        users: [],
        checkInDate: new Date(),
        checkInTime: '12:00',
        checkOutDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        checkOutTime: '11:00',
        noOfPersons: 1,
        noOfRooms: 1,
        roomNumbers: [],
        roomType: 'Standard',
        selectedUsers: [],
        totalPrice: 0,
        paidAmount: 0,
        leftAmount: 0,
        paymentStatus: 'Pending',
        paymentMethod: 'Cash',
        specialRequests: '',
        purpose: '',
        bookingStatus: 'Confirmed',
      });
      
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    
    switch (currentStep) {
      case 1:
        return (
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Guests</CardTitle>
                <CardDescription>
                  Choose existing users or add new users for this booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <div className="col-span-full flex justify-center items-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    users.map(user => (
                      <Card 
                        key={user._id} 
                        className={`cursor-pointer transition-all hover:border-primary ${
                          formData.selectedUsers.some(u => u._id === user._id) 
                            ? 'border-2 border-primary' 
                            : ''
                        }`}
                        onClick={() => handleUserSelect(user._id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{user.fullName}</CardTitle>
                            {formData.selectedUsers.some(u => u._id === user._id) && (
                              <Badge variant="default">Selected</Badge>
                            )}
                          </div>
                          <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Phone: {user.mobileNumber}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="noOfPersons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Persons</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        value={formData.noOfPersons}
                        onChange={(e) => handleInputChange('noOfPersons', parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Stay (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        value={formData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                        placeholder="Business, Leisure, etc."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="specialRequests"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any special requirements or requests"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Check-in Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-in Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                {format(formData.checkInDate, "PPP")}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.checkInDate}
                              onSelect={(date) => handleInputChange('checkInDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="checkInTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            value={formData.checkInTime}
                            onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Check-out Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    name="checkOutDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                {format(formData.checkOutDate, "PPP")}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.checkOutDate}
                              onSelect={(date) => handleInputChange('checkOutDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="checkOutTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            value={formData.checkOutTime}
                            onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type</FormLabel>
                        <Select
                          value={formData.roomType}
                          onValueChange={(value) => handleInputChange('roomType', value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roomTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="noOfRooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Rooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            value={formData.noOfRooms}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              handleInputChange('noOfRooms', value);
                              
                              // Auto-adjust room numbers array length
                              if (value > formData.roomNumbers.length) {
                                // Add room numbers
                                const newRooms = Array(value - formData.roomNumbers.length)
                                  .fill(0)
                                  .map((_, i) => `Room ${formData.roomNumbers.length + i + 1}`);
                                
                                handleInputChange('roomNumbers', [...formData.roomNumbers, ...newRooms]);
                              } else if (value < formData.roomNumbers.length) {
                                // Remove room numbers
                                handleInputChange('roomNumbers', formData.roomNumbers.slice(0, value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel>Room Numbers</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {formData.roomNumbers.map((roomNumber, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={roomNumber}
                          onChange={(e) => handleRoomNumberChange(index, e.target.value)}
                          placeholder={`Room ${index + 1}`}
                          className="flex-grow"
                        />
                      </div>
                    ))}
                  </div>
                  {formData.roomNumbers.length === 0 && (
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={handleAddRoom}
                      className="mt-2"
                    >
                      Add Room Number
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    name="totalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Price (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            value={formData.totalPrice}
                            onChange={(e) => handleInputChange('totalPrice', parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="paidAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paid Amount (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max={formData.totalPrice}
                            value={formData.paidAmount}
                            onChange={(e) => handleInputChange('paidAmount', parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="leftAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Left Amount (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={formData.leftAmount}
                            disabled
                            className="bg-muted"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange('paymentMethod', value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method} value={method}>
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select
                          value={formData.paymentStatus}
                          onValueChange={(value) => handleInputChange('paymentStatus', value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="bookingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Status</FormLabel>
                        <Select
                          value={formData.bookingStatus}
                          onValueChange={(value) => handleInputChange('bookingStatus', value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['Confirmed', 'Cancelled', 'Completed'].map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
        case 4:
  return (
    <div className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle>Booking Summary</CardTitle>
      <CardDescription>
        Review your booking details before confirming
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="rounded-lg bg-muted p-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {/* Content remains the same */}
          <div className="md:col-span-2">
            <dt className="font-medium text-primary text-lg">Guest Information</dt>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Selected Guests</dt>
            <dd className="mt-1">
              {formData.selectedUsers.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {formData.selectedUsers.map(user => (
                    <li key={user._id}>{user.fullName} ({user.mobileNumber})</li>
                  ))}
                </ul>
              ) : (
                <span className="text-muted-foreground">No guests selected</span>
              )}
            </dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Number of Persons</dt>
            <dd className="mt-1">{formData.noOfPersons}</dd>
          </div>
          
          {formData.purpose && (
            <div>
              <dt className="font-medium text-gray-900 dark:text-gray-100">Purpose of Stay</dt>
              <dd className="mt-1">{formData.purpose}</dd>
            </div>
          )}
          
          {formData.specialRequests && (
            <div className="md:col-span-2">
              <dt className="font-medium text-gray-900 dark:text-gray-100">Special Requests</dt>
              <dd className="mt-1">{formData.specialRequests}</dd>
            </div>
          )}
          
          <div className="md:col-span-2 pt-4">
            <dt className="font-medium text-primary text-lg">Stay Details</dt>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Check-in</dt>
            <dd className="mt-1">
              {format(formData.checkInDate, "PPP")} at {formData.checkInTime}
            </dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Check-out</dt>
            <dd className="mt-1">
              {format(formData.checkOutDate, "PPP")} at {formData.checkOutTime}
            </dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Room Type</dt>
            <dd className="mt-1">{formData.roomType}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Number of Rooms</dt>
            <dd className="mt-1">{formData.noOfRooms}</dd>
          </div>
          
          {formData.roomNumbers.length > 0 && (
            <div className="md:col-span-2">
              <dt className="font-medium text-gray-900 dark:text-gray-100">Room Numbers</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {formData.roomNumbers.map((room, index) => (
                  <Badge variant="outline" key={index}>
                    {room}
                  </Badge>
                ))}
              </dd>
            </div>
          )}
          
          <div className="md:col-span-2 pt-4">
            <dt className="font-medium text-primary text-lg">Payment Information</dt>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Total Price</dt>
            <dd className="mt-1">₹{formData.totalPrice.toLocaleString()}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Paid Amount</dt>
            <dd className="mt-1">₹{formData.paidAmount.toLocaleString()}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Balance Amount</dt>
            <dd className="mt-1">₹{formData.leftAmount.toLocaleString()}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Payment Method</dt>
            <dd className="mt-1">{formData.paymentMethod}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Payment Status</dt>
            <dd className="mt-1">
              <Badge variant={
                formData.paymentStatus === 'Paid' ? 'success' :
                formData.paymentStatus === 'Partial' ? 'warning' :
                formData.paymentStatus === 'Refunded' ? 'info' : 'destructive'
              }>
                {formData.paymentStatus}
              </Badge>
            </dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">Booking Status</dt>
            <dd className="mt-1">
              <Badge variant={
                formData.bookingStatus === 'Confirmed' ? 'success' :
                formData.bookingStatus === 'Completed' ? 'info' : 'destructive'
              }>
                {formData.bookingStatus}
              </Badge>
            </dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={handlePrevious}>
        Back
      </Button>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Confirm Booking'
        )}
      </Button>
    </CardFooter>
  </Card>
</div>
  );
}
} // This closes the renderStepContent function

return (
  <Form {...form}>
  <div className="space-y-6 px-8 py-4 mt-5 bg-white  shadow-md  ">
    {/* Stepper */}
    <div className="mb-8">
      <div className="flex items-center justify-between space-x-2">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep >= step.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {currentStep > step.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 hidden md:flex">
        <div className="flex w-full items-center">
          {steps.map((step, i) => (
            <div key={step.id} className="flex w-full items-center">
              <div
                className={`h-1 w-full ${
                  currentStep > step.id
                    ? 'bg-primary'
                    : currentStep === step.id
                    ? 'bg-primary/50'
                    : 'bg-gray-200'
                }`}
              />
              {i < steps.length - 1 && (
                <div
                  className={`h-1 w-full ${
                    currentStep > step.id + 1
                      ? 'bg-primary'
                      : currentStep === step.id + 1
                      ? 'bg-primary/50'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    

    {/* Step Content */}
    {renderStepContent()}

    {/* Navigation Buttons */}
    {currentStep < 4 && (
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    )}
  </div>
  </Form>
);
};

export default OfflineBookingForm;