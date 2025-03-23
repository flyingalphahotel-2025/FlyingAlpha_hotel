"use client";
import HotelBookingForm from "@/components/Frontend/UI/HotelBookingForm";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Card className="w-full mb-5">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              Book Your Stay Now
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Best rates guaranteed when you book directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HotelBookingForm />
          </CardContent>
          <CardFooter className="flex-col items-center">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              By booking, you agree to our terms and conditions. Free
              cancellation up to 24 hours before check-in.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full max-w-md"
            >
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Complete Your Booking & Save 15%
              </Button>
            </motion.div>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Flying Alpha Hotel Patna
            </CardTitle>
            <CardDescription className="text-xl text-blue-100">
              Luxury and comfort in the heart of Patna
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
              <Badge
                variant="outline"
                className="bg-yellow-500 text-black font-bold p-3 text-lg"
              >
                LIMITED TIME: Book Now & Save 15%
              </Badge>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-1 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Experience Flying Alpha Hotel</CardTitle>
                  <CardDescription>
                    Your perfect stay in Patna awaits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Flying Alpha Hotel in Patna offers a luxurious and
                    comfortable stay with a range of amenities designed to cater
                    to both leisure and business travelers.
                  </p>
                  <p className="mb-4">
                    Perfectly positioned in the heart of Patna, our hotel
                    combines modern luxury with warm hospitality. From spacious
                    rooms to exceptional service, we ensure your stay is nothing
                    short of perfect.
                  </p>
                  <p>
                    Our well-appointed Classic rooms measure approximately 97
                    sq.ft (9 sq.mt) with a queen bed, accommodating up to four
                    guests comfortably.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amenities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Amenities</CardTitle>
                  <CardDescription>
                    Everything you need for a comfortable stay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-3">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Air Conditioning (AC)
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Free Wi-Fi
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Television (TV)
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Geyser
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Power Backup
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">✓</Badge>
                      Free Breakfast
                    </li>
                  </ul>
                  <Separator className="my-6" />
                  <p>
                    Enjoy our complimentary breakfast served daily from 8 AM to
                    10 PM, featuring both local and international cuisines.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="location" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prime Location</CardTitle>
                  <CardDescription>Explore the best of Patna</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Nearby Attractions:</p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge>Attraction</Badge>
                      <span>
                        Golghar - A historic granary offering panoramic views of
                        the city
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge>Attraction</Badge>
                      <span>
                        Patna Museum - Showcases Bihar's rich history and
                        heritage
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge>Attraction</Badge>
                      <span>
                        Buddha Smriti Park - A serene park dedicated to Buddha
                      </span>
                    </li>
                  </ul>

                  <p className="mb-4">Transportation:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Transport</Badge>
                      <span>Patna Junction Railway Station - 3.2 km</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Transport</Badge>
                      <span>Jay Prakash Narayan Airport - 4.9 km</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Transport</Badge>
                      <span>
                        Local Transport - Auto-rickshaws, taxis, and buses
                        available
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Flying Alpha Hotel?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">Prime Location</h3>
                  <p>
                    Located in the heart of Patna with easy access to major
                    attractions and transport hubs.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">Exceptional Service</h3>
                  <p>
                    Our staff is committed to providing personalized service to
                    make your stay memorable.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">Value for Money</h3>
                  <p>
                    Enjoy premium amenities and comfort without breaking the
                    bank.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>What Our Guests Say</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Excellent service and amenities. The rooms were clean and
                    staff was very helpful. Will definitely stay again!"
                  </p>
                  <p className="font-bold">- Rahul S.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Perfect location for both business and leisure. Breakfast
                    was delicious and the Wi-Fi was very fast."
                  </p>
                  <p className="font-bold">- Priya M.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Great value for money. The hotel is well-maintained and the
                    staff goes above and beyond to make your stay comfortable."
                  </p>
                  <p className="font-bold">- Amit K.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Ready for a Memorable Stay?
                </h3>
                <p className="mb-4 md:mb-0">
                  Book now to enjoy our special discount and premium amenities!
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Reserve Your Room Now
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Booking Form Full Width at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full"
      ></motion.div>
    </div>
  );
};

export default Page;
