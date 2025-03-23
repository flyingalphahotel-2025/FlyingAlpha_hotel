import React from 'react';
import { format } from 'date-fns';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const RoomDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleAddRoom, 
  handleRemoveRoom, 
  handleRoomNumberChange 
}) => {
  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];

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
};

export default RoomDetailsStep;