import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/dbConnect";
import userModels from "@/models/userModels";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Parse the JSON body
    const { fullName, email, mobileNumber, password } = await req.json();
    console.log("Received values:", { fullName, email, mobileNumber, password });

    // Validate required fields
    if (!fullName || !email || !mobileNumber || !password) {
      console.log("Validation failed: Missing required fields.");
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    // Validate the mobile number to ensure it is a 10-digit number
    const mobileNumberPattern = /^\d{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      console.log("Validation failed: Invalid mobile number.");
      return NextResponse.json({ msg: "Please provide a valid 10-digit mobile number." }, { status: 400 });
    }

    // Add country code +91
    const formattedMobileNumber = `+91${mobileNumber}`;
    console.log("Formatted mobile number:", formattedMobileNumber);

    // Check if the email or mobile number already exists
    const existingUser = await userModels.findOne({ $or: [{ email }, { mobileNumber: formattedMobileNumber }] });
    if (existingUser) {
      console.log("Validation failed: User already exists with the provided email or mobile number.");
      return NextResponse.json({ msg: "User with this email or mobile number already exists." }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    // Create a new user
    const userData = {
      fullName,
      email,
      mobileNumber: formattedMobileNumber,
      password: hashedPassword,
    };

    const user = new userModels(userData);
    await user.save();
    console.log("User saved to the database:", user);

    return NextResponse.json({ msg: "Account created successfully" }, { status: 200 });
  } catch (error) {
    console.log("Error creating account:", error.message);
    return NextResponse.json({ msg: "Error creating account", error: error.message }, { status: 500 });
  }
};``