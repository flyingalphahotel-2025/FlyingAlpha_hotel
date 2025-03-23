import React from 'react';
import { Loader2, Plus } from 'lucide-react';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const GuestInformationStep = ({ 
  formData, 
  handleInputChange, 
  users, 
  isLoading, 
  handleUserSelect, 
  isDialogOpen, 
  setIsDialogOpen, 
  handleGuestAdded 
}) => {
  return (
    <div className="space-y-6">
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
};

export default GuestInformationStep;