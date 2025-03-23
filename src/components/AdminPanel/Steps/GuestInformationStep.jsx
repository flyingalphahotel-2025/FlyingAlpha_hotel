"use client"
import React, { useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';

const GuestInformationStep = ({ 
  formData, 
  handleInputChange, 
  users, 
  isLoading, 
  handleUserSelect, 
  isDialogOpen, 
  setIsDialogOpen, 
  handleGuestAdded,
  form
}) => {
  // State for new guest form
  const [newGuest, setNewGuest] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    adhaarCardNo: '',
    voterIdNo: '',
    drivingLicence: ''
  });

  // State for field validation errors
  const [validationErrors, setValidationErrors] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    adhaarCardNo: '',
    voterIdNo: '',
    drivingLicence: ''
  });
  
  // Validation functions
  const validateMobileNumber = (value) => {
    if (!value) return true; // Optional field
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(value);
  };
  
  const validateAdhaarCard = (value) => {
    if (!value) return true; // Optional field
    const adhaarRegex = /^\d{12}$/;
    return adhaarRegex.test(value);
  };
  
  const validateDrivingLicense = (value) => {
    if (!value) return true; // Optional field
    const dlRegex = /^\d{16}$/;
    return dlRegex.test(value);
  };
  
  const validateVoterId = (value) => {
    if (!value) return true; // Optional field
    const voterIdRegex = /^[A-Za-z0-9]{10}$/;
    return voterIdRegex.test(value);
  };
  
  const validateEmail = (value) => {
    if (!value) return false; // Required field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  // Handle input change for new guest form with validation
  const handleNewGuestChange = (field, value) => {
    setNewGuest(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user types
    setValidationErrors(prev => ({
      ...prev,
      [field]: ''
    }));
    
    // Validate fields on change
    if (field === 'mobileNumber' && value && !validateMobileNumber(value)) {
      setValidationErrors(prev => ({
        ...prev,
        mobileNumber: 'Mobile number must be 10 digits'
      }));
    } else if (field === 'adhaarCardNo' && value && !validateAdhaarCard(value)) {
      setValidationErrors(prev => ({
        ...prev,
        adhaarCardNo: 'Adhaar Card Number must be 12 digits'
      }));
    } else if (field === 'drivingLicence' && value && !validateDrivingLicense(value)) {
      setValidationErrors(prev => ({
        ...prev,
        drivingLicence: 'Driving License must be 16 digits'
      }));
    } else if (field === 'voterIdNo' && value && !validateVoterId(value)) {
      setValidationErrors(prev => ({
        ...prev,
        voterIdNo: 'Voter ID must be 10 alphanumeric characters'
      }));
    } else if (field === 'email' && value && !validateEmail(value)) {
      setValidationErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    }
  };
  
  // Validate all fields before submission
  const validateAllFields = () => {
    const errors = {
      fullName: !newGuest.fullName ? 'Full name is required' : '',
      email: !newGuest.email ? 'Email is required' : !validateEmail(newGuest.email) ? 'Please enter a valid email address' : '',
      mobileNumber: newGuest.mobileNumber && !validateMobileNumber(newGuest.mobileNumber) ? 'Mobile number must be 10 digits' : '',
      adhaarCardNo: newGuest.adhaarCardNo && !validateAdhaarCard(newGuest.adhaarCardNo) ? 'Adhaar Card Number must be 12 digits' : '',
      voterIdNo: newGuest.voterIdNo && !validateVoterId(newGuest.voterIdNo) ? 'Voter ID must be 10 alphanumeric characters' : '',
      drivingLicence: newGuest.drivingLicence && !validateDrivingLicense(newGuest.drivingLicence) ? 'Driving License must be 16 digits' : ''
    };
    
    setValidationErrors(errors);
    
    // Check if there are any validation errors
    return !Object.values(errors).some(error => error !== '');
  };
  
  // Handle adding a new guest
  const handleAddGuest = () => {
    // Validate the new guest information
    if (!validateAllFields()) {
      return false; // Return false to indicate validation failure
    }
    
    // Call the parent component's handler to add the guest
    handleGuestAdded({
      ...newGuest,
      _id: Date.now().toString() // Add a temporary unique ID
    });    
    // Reset the form
    setNewGuest({
      fullName: '',
      email: '',
      mobileNumber: '',
      adhaarCardNo: '',
      voterIdNo: '',
      drivingLicence: ''
    });
    
    return true; // Return true to indicate success
  };
  
  const handleAddAndClose = () => {
    const success = handleAddGuest();
    if (success) {
      setIsDialogOpen(false); // Only close if validation passed
    }
  };
  
  const handleAddAndContinue = () => {
    handleAddGuest();
    // Keep the dialog open for adding another guest
  };

  const handleUserSelection = (userId) => {
    const user = users.find(u => u._id === userId);
    const isSelected = formData.selectedUsers.some(u => u._id === userId);
    
    // Call the parent component's handler
    handleUserSelect(userId);
  };

  return (
    <div className="space-y-6">
      {/* Guest Selection Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Select Guests</CardTitle>
            <CardDescription>
              Choose existing users or add new users for this booking.
            </CardDescription>
          </div>
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
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
                  onClick={() => handleUserSelection(user._id)}
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

      {/* Booking Information Form */}
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
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    handleInputChange('noOfPersons', value);
                  }}
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

      {/* Add Guest Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Guest</DialogTitle>
            <DialogDescription>
              Enter the details of the new guest to add them to your booking.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <FormItem>
              <FormLabel htmlFor="fullName" className="text-right">
                Full Name*
              </FormLabel>
              <FormControl>
                <Input
                  id="fullName"
                  value={newGuest.fullName}
                  onChange={(e) => handleNewGuestChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </FormControl>
              {validationErrors.fullName && (
                <FormMessage>{validationErrors.fullName}</FormMessage>
              )}
            </FormItem>
            
            <FormItem>
              <FormLabel htmlFor="email" className="text-right">
                Email*
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => handleNewGuestChange('email', e.target.value)}
                  placeholder="john.doe@example.com"
                  className="col-span-3"
                />
              </FormControl>
              {validationErrors.email && (
                <FormMessage>{validationErrors.email}</FormMessage>
              )}
            </FormItem>
            
            <FormItem>
              <FormLabel htmlFor="mobileNumber" className="text-right">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  id="mobileNumber"
                  value={newGuest.mobileNumber}
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/\D/g, '');
                    // Limit to 10 digits
                    const trimmed = value.slice(0, 10);
                    handleNewGuestChange('mobileNumber', trimmed);
                  }}
                  placeholder="10 digit mobile number"
                  className="col-span-3"
                />
              </FormControl>
              {validationErrors.mobileNumber && (
                <FormMessage>{validationErrors.mobileNumber}</FormMessage>
              )}
            </FormItem>
            
            {/* Identity Document Tabs */}
            <Tabs defaultValue="adhaar" className="w-full">
              <TabsList className="grid grid-cols-3 mb-2">
                <TabsTrigger value="adhaar">Adhaar Card</TabsTrigger>
                <TabsTrigger value="voter">Voter ID</TabsTrigger>
                <TabsTrigger value="driving">Driving License</TabsTrigger>
              </TabsList>
              <TabsContent value="adhaar">
                <FormItem>
                  <FormLabel htmlFor="adhaarCardNo">Adhaar Card Number</FormLabel>
                  <FormControl>
                    <Input 
                      id="adhaarCardNo" 
                      placeholder="12 digit Adhaar number" 
                      value={newGuest.adhaarCardNo}
                      onChange={(e) => {
                        // Only allow digits
                        const value = e.target.value.replace(/\D/g, '');
                        // Limit to 12 digits
                        const trimmed = value.slice(0, 12);
                        handleNewGuestChange('adhaarCardNo', trimmed);
                      }}
                    />
                  </FormControl>
                  {validationErrors.adhaarCardNo && (
                    <FormMessage>{validationErrors.adhaarCardNo}</FormMessage>
                  )}
                </FormItem>
              </TabsContent>
              <TabsContent value="voter">
                <FormItem>
                  <FormLabel htmlFor="voterIdNo">Voter ID Number</FormLabel>
                  <FormControl>
                    <Input 
                      id="voterIdNo" 
                      placeholder="10 character Voter ID" 
                      value={newGuest.voterIdNo}
                      onChange={(e) => {
                        // Allow alphanumeric characters
                        const value = e.target.value.replace(/[^A-Za-z0-9]/g, '');
                        // Limit to 10 characters
                        const trimmed = value.slice(0, 10);
                        handleNewGuestChange('voterIdNo', trimmed);
                      }}
                    />
                  </FormControl>
                  {validationErrors.voterIdNo && (
                    <FormMessage>{validationErrors.voterIdNo}</FormMessage>
                  )}
                </FormItem>
              </TabsContent>
              <TabsContent value="driving">
                <FormItem>
                  <FormLabel htmlFor="drivingLicence">Driving License Number</FormLabel>
                  <FormControl>
                    <Input 
                      id="drivingLicence" 
                      placeholder="16 digit Driving License" 
                      value={newGuest.drivingLicence}
                      onChange={(e) => {
                        // Only allow digits
                        const value = e.target.value.replace(/\D/g, '');
                        // Limit to 16 digits
                        const trimmed = value.slice(0, 16);
                        handleNewGuestChange('drivingLicence', trimmed);
                      }}
                    />
                  </FormControl>
                  {validationErrors.drivingLicence && (
                    <FormMessage>{validationErrors.drivingLicence}</FormMessage>
                  )}
                </FormItem>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button type="button" onClick={handleAddAndContinue}>
                Add & Continue
              </Button>
              <Button type="button" onClick={handleAddAndClose}>
                Add & Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestInformationStep;