import connectDB from "@/lib/dbConnect";
import offlineBooking from "@/models/offlineBooking";
import { NextResponse } from "next/server";
import userModels from "@/models/userModels";


// GET /api/offlineBooking/[id]
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await offlineBooking.findById(id).populate({
        path: "users", // Correct path based on your schema
      })

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Booking fetched successfully",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      {
        message: "Error fetching booking",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};



export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = await params; // ✅ No need to use `await` here
    const body = await req.json();

    const updatedBooking = await offlineBooking.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate({
      path: "users",
      select: "fullName email mobileNumber",
    });

    if (!updatedBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true, // ✅ Add this
        message: "Booking updated successfully",
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      {
        success: false, // ✅ Error should return false
        message: "Error updating booking",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

