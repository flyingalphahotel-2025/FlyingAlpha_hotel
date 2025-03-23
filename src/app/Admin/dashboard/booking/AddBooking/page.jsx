"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Loader2, Plus } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

// Step Components
import GuestInformationStep from '@/components/AdminPanel/Steps/GuestInformationStep';
import RoomDetailsStep from '@/components/AdminPanel/Steps/RoomDetailsStep';
import PaymentInformationStep from '@/components/AdminPanel/Steps/PaymentInformationStep';
import ReviewConfirmStep from '@/components/AdminPanel/Steps/ReviewConfirmStep';



const OfflineBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      noOfPersons: 1,
      noOfRooms: 1,
      roomType: 'Standard',
      paymentMethod: 'Cash',
    }
  });

  const handleGuestAdded = (newGuest) => {
    setUsers(prev => [...prev, newGuest]);
    handleUserSelect(newGuest._id);
    toast.success('New guest added successfully.');
  };

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

  // Render current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GuestInformationStep 
            formData={formData}
            handleInputChange={handleInputChange}
            users={users}
            isLoading={isLoading}
            handleUserSelect={handleUserSelect}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleGuestAdded={handleGuestAdded}
          />
        );
      case 2:
        return (
          <RoomDetailsStep 
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddRoom={handleAddRoom}
            handleRemoveRoom={handleRemoveRoom}
            handleRoomNumberChange={handleRoomNumberChange}
          />
        );
      case 3:
        return (
          <PaymentInformationStep 
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <ReviewConfirmStep 
            formData={formData}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6 px-8 py-4 mt-5 bg-white  shadow-md">
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