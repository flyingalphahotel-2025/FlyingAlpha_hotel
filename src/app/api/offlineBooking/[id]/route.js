import connectDB from "@/lib/dbConnect";
import offlineBooking from "@/models/offlineBooking";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const booking = await offlineBooking.findById(id).populate({
      path: "users",
      select: "fullName email mobileNumber",
    });

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
