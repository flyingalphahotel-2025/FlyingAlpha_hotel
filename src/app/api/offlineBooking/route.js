import connectDB from "@/lib/dbConnect";
import offlineBooking from "@/models/offlineBooking";
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        console.log("Full Request Body:", body);

        // Destructure all fields from the form data
        const {
            selectedUsers,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime,
            noOfPersons,
            noOfRooms,
            roomNumbers,
            roomType,
            totalPrice,
            paidAmount,
            leftAmount,
            paymentStatus,
            paymentMethod,
            specialRequests,
            purpose,
            bookingStatus
        } = body;

        // Validate required fields
        if (!selectedUsers || selectedUsers.length === 0) {
            return NextResponse.json(
                { message: "At least one guest is required" },
                { status: 400 }
            );
        }

        // Process each selected user and collect their IDs
        const userIds = await Promise.all(selectedUsers.map(async (user) => {
            // Validate user data
            if (!user.fullName || !user.email || !user.mobileNumber) {
                throw new Error(`Invalid user data: Missing required fields for ${JSON.stringify(user)}`);
            }

            // Find existing user with matching criteria
            let existingUser = await userModels.findOne({
                $or: [
                    { 
                        $and: [
                            { fullName: user.fullName },
                            { email: user.email },
                            { mobileNumber: user.mobileNumber }
                        ]
                    },
                    { email: user.email },
                    { mobileNumber: user.mobileNumber }
                ]
            });

            // If no existing user, create a new one
            if (!existingUser) {
                existingUser = new userModels({
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                });
                await existingUser.save();
            } else {
                // If user exists, update any missing or outdated information
                let needsUpdate = false;
                
                if (!existingUser.fullName && user.fullName) {
                    existingUser.fullName = user.fullName;
                    needsUpdate = true;
                }
                
                if (!existingUser.email && user.email) {
                    existingUser.email = user.email;
                    needsUpdate = true;
                }
                
                if (!existingUser.mobileNumber && user.mobileNumber) {
                    existingUser.mobileNumber = user.mobileNumber;
                    needsUpdate = true;
                }
                
                if (needsUpdate) {
                    await existingUser.save();
                }
            }

            return existingUser._id;
        }));

        console.log("User IDs:", userIds);

        // Create booking with array of user IDs
        const newBooking = new offlineBooking({
            users: userIds, // Save array of user IDs
            checkInDate: new Date(checkInDate),
            checkInTime: checkInTime,
            checkOutDate: new Date(checkOutDate),
            checkOutTime: checkOutTime,
            noOfPersons: parseInt(noOfPersons),
            noOfRooms: parseInt(noOfRooms),
            roomNumbers: roomNumbers,
            roomType: roomType,
            totalPrice: parseFloat(totalPrice),
            paidAmount: parseFloat(paidAmount),
            leftAmount: parseFloat(leftAmount),
            paymentStatus: paymentStatus,
            paymentMethod: paymentMethod,
            specialRequests: specialRequests,
            purpose: purpose,
            bookingStatus: bookingStatus
        });

        await newBooking.save();

        // Generate a booking reference number
        const bookingReference = `#Alpha${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

        return NextResponse.json(
            { 
                message: "Booking created successfully", 
                booking: newBooking,
                bookingReference: bookingReference
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error processing booking:", error);
        return NextResponse.json(
            { 
                message: "Error processing booking", 
                error: error instanceof Error ? error.message : String(error) 
            },
            { status: 500 }
        );
    }
};

export const GET = async () => {
    try {
      await connectDB();
  
      const bookings = await offlineBooking.find()
        .populate({
          path: "users", // Correct path based on your schema
          select: "fullName email mobileNumber", // Select relevant user fields
        })
        .sort({ createdAt: -1 }); // Most recent first
  
      return NextResponse.json(
        {
          message: "Bookings fetched successfully",
          bookings,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json(
        {
          message: "Error fetching bookings",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  };