import React from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ReviewConfirmStep = ({ formData, handlePrevious, handleSubmit, isLoading }) => {
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
                  {formData.selectedUsers && formData.selectedUsers.length > 0 ? (
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
              
              {formData.roomNumbers && formData.roomNumbers.length > 0 && (
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
};

export default ReviewConfirmStep;