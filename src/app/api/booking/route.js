import connectDB from "@/Lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database ........");
    await connectDB(); // Ensure the database connection is awaited
    console.log("Connected to the database .......");

    console.log("Parsing request body.....");
    const body = await req.json(); // Await the parsing of the request body
    console.log(body);

    // Return the response directly
    return NextResponse.json({ message: "Parsed the body" }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
};