"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CalendarIcon } from 'lucide-react';

const HotelBookingDashboard = () => {
  // Sample data - in a real application, this would come from an API
  const [bookingData] = useState([
    { month: 'Jan', onlineBookings: 120, offlineBookings: 85, onlineRevenue: 24000, offlineRevenue: 19500 },
    { month: 'Feb', onlineBookings: 145, offlineBookings: 78, onlineRevenue: 29000, offlineRevenue: 18200 },
    { month: 'Mar', onlineBookings: 175, offlineBookings: 90, onlineRevenue: 35000, offlineRevenue: 20500 },
    { month: 'Apr', onlineBookings: 190, offlineBookings: 82, onlineRevenue: 38000, offlineRevenue: 19000 },
    { month: 'May', onlineBookings: 210, offlineBookings: 95, onlineRevenue: 42000, offlineRevenue: 21500 },
    { month: 'Jun', onlineBookings: 230, offlineBookings: 105, onlineRevenue: 46000, offlineRevenue: 24000 },
  ]);

  // Room type distribution data
  const roomTypeData = [
    { name: 'Standard', value: 45 },
    { name: 'Deluxe', value: 30 },
    { name: 'Suite', value: 15 },
    { name: 'Executive', value: 10 },
  ];

  // Booking source data
  const bookingSourceData = [
    { name: 'Direct Website', value: 40 },
    { name: 'OTA Partners', value: 35 },
    { name: 'Phone/Email', value: 15 },
    { name: 'Walk-in', value: 10 },
  ];

  // Calculate totals
  const totalOnlineBookings = bookingData.reduce((sum, item) => sum + item.onlineBookings, 0);
  const totalOfflineBookings = bookingData.reduce((sum, item) => sum + item.offlineBookings, 0);
  const totalOnlineRevenue = bookingData.reduce((sum, item) => sum + item.onlineRevenue, 0);
  const totalOfflineRevenue = bookingData.reduce((sum, item) => sum + item.offlineRevenue, 0);
  const totalBookings = totalOnlineBookings + totalOfflineBookings;
  const totalRevenue = totalOnlineRevenue + totalOfflineRevenue;

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex flex-col w-full p-4 space-y-6 bg-gray-50 max-h-[40vh] custom-scrollbar pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Hotel Booking Dashboard</h1>
        <div className="flex items-center text-sm font-medium text-gray-500">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last Updated: March 24, 2025
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-gray-500 mt-1">
              Online: {totalOnlineBookings} | Offline: {totalOfflineBookings}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              Online: ${totalOnlineRevenue.toLocaleString()} | Offline: ${totalOfflineRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Revenue per Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalRevenue / totalBookings).toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              Online: ${Math.round(totalOnlineRevenue / totalOnlineBookings).toLocaleString()} | 
              Offline: ${Math.round(totalOfflineRevenue / totalOfflineBookings).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Online Booking Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((totalOnlineBookings / totalBookings) * 100)}%</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalOnlineBookings} out of {totalBookings} bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Comparison Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Online vs Offline Bookings</CardTitle>
            <CardDescription>Monthly comparison of booking channels</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onlineBookings" name="Online Bookings" fill="#0088FE" />
                <Bar dataKey="offlineBookings" name="Offline Bookings" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trends Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue by booking channel</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bookingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="onlineRevenue" name="Online Revenue" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="offlineRevenue" name="Offline Revenue" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
            <CardDescription>Percentage of bookings by room type</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Source */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Source</CardTitle>
            <CardDescription>Distribution of booking channels</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bookingSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Booking Details</CardTitle>
          <CardDescription>Detailed breakdown of booking data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Online Bookings</th>
                  <th className="text-right p-2">Offline Bookings</th>
                  <th className="text-right p-2">Online Revenue</th>
                  <th className="text-right p-2">Offline Revenue</th>
                  <th className="text-right p-2">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((item) => (
                  <tr key={item.month} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.month}</td>
                    <td className="text-right p-2">{item.onlineBookings}</td>
                    <td className="text-right p-2">{item.offlineBookings}</td>
                    <td className="text-right p-2">${item.onlineRevenue.toLocaleString()}</td>
                    <td className="text-right p-2">${item.offlineRevenue.toLocaleString()}</td>
                    <td className="text-right p-2 font-medium">${(item.onlineRevenue + item.offlineRevenue).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-gray-50 font-medium">
                  <td className="p-2">Total</td>
                  <td className="text-right p-2">{totalOnlineBookings}</td>
                  <td className="text-right p-2">{totalOfflineBookings}</td>
                  <td className="text-right p-2">${totalOnlineRevenue.toLocaleString()}</td>
                  <td className="text-right p-2">${totalOfflineRevenue.toLocaleString()}</td>
                  <td className="text-right p-2">${totalRevenue.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelBookingDashboard;