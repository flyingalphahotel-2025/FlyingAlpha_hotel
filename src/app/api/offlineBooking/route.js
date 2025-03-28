import connectDB from "@/lib/dbConnect";
import bookingModels from "@/models/bookingModels";
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

        // Process each selected user
        const userBookings = await Promise.all(selectedUsers.map(async (user) => {
            // Find or create user
            let existingUser = await userModels.findOne({ 
                $or: [
                    { email: user.email }, 
                    { mobileNumber: user.mobileNumber }
                ] 
            });

            if (!existingUser) {
                existingUser = new userModels({
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    // Add any other user fields from the form
                });
                await existingUser.save();
            }

            // Create booking
            const newBooking = new bookingModels({
                user: existingUser._id,
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
            return newBooking;
        }));

        // Generate a booking reference number
        const bookingReference = `#Alpha${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

        return NextResponse.json(
            { 
                message: "Booking created successfully", 
                bookings: userBookings,
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

// GET API to fetch all bookings with detailed user information
export const GET = async () => {
    try {
        await connectDB();

        const bookings = await bookingModels.find()
            .populate({
                path: 'user',
                select: 'fullName email mobileNumber'
            })
            .sort({ createdAt: -1 }); // Sort by most recent bookings first

        return NextResponse.json(
            { 
                message: "Bookings fetched successfully", 
                bookings 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { 
                message: "Error fetching bookings", 
                error: error instanceof Error ? error.message : String(error) 
            },
            { status: 500 }
        );
    }
};