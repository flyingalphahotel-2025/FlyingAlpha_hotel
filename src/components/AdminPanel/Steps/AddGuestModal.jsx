// components/AddGuestModal.tsx
"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/toast';



const AddGuestModal = ({ open, onOpenChange, onGuestAdded }) => {
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      dob: null,
      adhaarCardNo: '',
      voterIdNo: '',
      drivingLicence: '',
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!data.fullName || !data.mobileNumber) {
      toast({
        title: "Error",
        description: "Full name and mobile number are required.",
        variant: "destructive",
      });
      return;
    }

    const newGuest = {
      _id: `temp_${Date.now()}`,
      ...data
    };

    onGuestAdded(newGuest);
    form.reset();
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>
            Enter guest details to create a new guest profile.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="Mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value ? format(field.value, "PPP") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Tabs defaultValue="adhaar">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="adhaar">Adhaar Card</TabsTrigger>
                  <TabsTrigger value="voter">Voter ID</TabsTrigger>
                  <TabsTrigger value="driving">Driving License</TabsTrigger>
                </TabsList>
                <TabsContent value="adhaar">
                  <FormField
                    control={form.control}
                    name="adhaarCardNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adhaar Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="XXXX XXXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="voter">
                  <FormField
                    control={form.control}
                    name="voterIdNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voter ID Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Voter ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="driving">
                  <FormField
                    control={form.control}
                    name="drivingLicence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driving License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Driving License" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Guest</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestModal;