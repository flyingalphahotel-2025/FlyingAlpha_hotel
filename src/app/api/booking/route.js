import connectDB from "@/Lib/dbConnect";
import bookingModels from "@/models/bookingModels";
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        console.log("Connecting to the database...");
        await connectDB();
        console.log("Connected to the database");

        console.log("Parsing request body...");
        const body = await req.json();
        console.log("Request Body:", body);

        const { name, email, mobile, checkInDate, checkOutDate, noOfPersons, noOfRooms, roomType, totalPrice } = body;

        // Validate required fields
        if (!name || !email || !mobile || !checkInDate || !checkOutDate || !noOfPersons || !noOfRooms || !roomType || !totalPrice) {
            console.error("Missing required fields in request body");
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        console.log("Checking if user exists...");
        let user = await userModels.findOne({ $or: [{ email }, { mobile }] });

        if (!user) {
            console.log("Creating new user...");
            user = new userModels({
                fullName: name,
                email,
                mobileNumber: mobile,
            });
            await user.save();
            console.log("User created successfully:", user);
        } else {
            console.log("User already exists:", user);
        }

        console.log("Creating new booking document...");
        const newBooking = new bookingModels({
            user: user._id,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            noOfPersons: parseInt(noOfPersons),
            noOfRooms: parseInt(noOfRooms),
            roomType,
            price: parseFloat(totalPrice),
        });

        console.log("Saving booking to database...");
        await newBooking.save();
        console.log("Booking created successfully:", newBooking);

        return NextResponse.json(
            { message: "Booking created successfully", booking: newBooking },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { message: "Error processing request", error: error.message },
            { status: 500 }
        );
    }
};

// GET API to fetch all bookings with user data
export const GET = async () => {
    try {
        console.log("Connecting to the database...");
        await connectDB();
        console.log("Connected to the database");

        console.log("Fetching all bookings with user data...");
        const bookings = await bookingModels.find().populate("user", "fullName email mobileNumber");
        console.log("Bookings fetched successfully:", bookings);

        return NextResponse.json(
            { message: "Bookings fetched successfully", bookings },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { message: "Error fetching bookings", error: error.message },
            { status: 500 }
        );
    }
};