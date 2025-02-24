import connectDB from "@/Lib/dbConnect"
import { NextResponse } from "next/server";

export const POST = async(req) => {
    try {
    console.log("Connecting to the database ........")
    connectDB();
    console.log("Connected to the database .......")

    console.log("Parsing request body.....")
    const body = req.json();
    console.log(body);
    await NextResponse.json({message : "paresed the body " }, {status: 200})
    } catch (error) {
        console.error("Error processing request:", error);
    return NextResponse.json({ message: "Error processing request", error: error.message }, { status: 500 });
    }

    
}