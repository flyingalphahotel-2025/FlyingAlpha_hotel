import connectDB from "@/Lib/dbConnect";
import bookingModels from "@/models/bookingModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        console.log("Connecting to the database ........");
        await connectDB(); // Ensure the database connection is awaited
        console.log("Connected to the database .......");

        console.log("Parsing request body.....");
        const body = await req.json(); // Await the parsing of the request body
        console.log("Request Body:", body);

        const {
            userId, // Expecting user ID instead of user details
            checkInDate,
            checkOutDate,
            noOfPersons,
            noOfRooms,
            roomType,
            price, // Renamed from totalPrice to match schema
        } = body;

        // Validate required fields
        if (!userId || !checkInDate || !checkOutDate || !noOfPersons || !noOfRooms || !roomType || !price) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate roomType
        const validRoomTypes = ["Executive Room", "Deluxe Room"];
        if (!validRoomTypes.includes(roomType)) {
            return NextResponse.json(
                { message: "Invalid room type" },
                { status: 400 }
            );
        }

        console.log("Creating new booking document...");

        // Create a new booking
        const newBooking = new bookingModels({
            user: userId, // Pass user ID instead of user details
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            noOfPersons: parseInt(noOfPersons),
            noOfRooms: parseInt(noOfRooms),
            roomType,
            price: parseFloat(price), // Ensure price is a number
        });

        console.log("Saving booking to database...");
        await newBooking.save();
        console.log("Booking created successfully:", newBooking);

        // Return success response
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