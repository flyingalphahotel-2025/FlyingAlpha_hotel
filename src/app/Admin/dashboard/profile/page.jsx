'use client';
import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProfileSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [fullName, setFullName] = useState('Amit Kumar');
  const [email, setEmail] = useState('amit@cleanveda.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Mumbai, India');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="max-w-full mx-auto p-4 bg-gray-50 my-10 w-full overflow-y-auto max-h-[86vh] space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Profile Picture and Info */}
          <div className="flex items-center space-x-6 pb-4">
            <UserCircle className="text-gray-500 w-20 h-20" />
            <div>
              <h2 className="text-lg font-semibold">{fullName}</h2>
              <p className="text-muted-foreground">Administrator</p>
              <Button className="mt-2">Change Photo</Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-6">Save Changes</Button>
        </CardContent>
      </Card>
      
      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button className="mt-2">Update Password</Button>
        </CardContent>
      </Card>
      
      {/* Account Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Account Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center py-2">
            <Label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</Label>
            <Switch
              id="emailNotifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center py-2">
            <Label htmlFor="twoFactor" className="cursor-pointer">Two-Factor Authentication</Label>
            <Switch
              id="twoFactor"
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}