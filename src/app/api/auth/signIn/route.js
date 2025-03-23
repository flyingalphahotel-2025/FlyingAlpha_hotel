import connectDB from '@/lib/dbConnect';
import userModels from '@/models/userModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        console.log("Received login request");

        await connectDB();
        console.log("Database connected");

        // Parse the JSON body of the request
        const { email, password, rememberMe } = await req.json();
        console.log("Request Body:", { email, password, rememberMe });

        // Find the user by email
        const user = await userModels.findOne({ email });
        console.log("User found:", user);

        // If user not found, return 401
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ msg: "User Not Found" }, { status: 401 });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.log("Invalid email or password");
            return NextResponse.json({ msg: "Invalid email or password" }, { status: 401 });
        }

        // Check if user status is "Active"
        console.log("User status:", user.status);
        if (user.status !== 'Active') {
            console.log("User not authorized due to status");
            return NextResponse.json({ msg: "Not Authorised" }, { status: 403 });
        }

        // Check if the user's role matches the required role
        console.log("User role:", user.role);
        if (user.role !== 'SuperAdmin') {
            console.log("User not authorized due to role");
            return NextResponse.json({ msg: "Not Authorised" }, { status: 403 });
        }

        // Generate a JWT token
        const token = generateToken({ id: user._id, email: user.email });
        console.log("Generated token:", token);

        // Create response and set cookie
        const response = NextResponse.json({ msg: "Login successful" }, { status: 200 });

        response.cookies.set('adminAuthToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7, // 1 month if 'rememberMe', otherwise 1 week
            path: '/'
        });

        console.log("Response cookies set");
        console.log("Login successful");

        return response;

    } catch (error) {
        console.error("Error processing login:", error.message || error);
        return NextResponse.json({ msg: "Error processing login", error: error.message || error }, { status: 500 });
    }
};

// Function to generate a JWT token
function generateToken(user) {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        throw new Error("JWT_SECRET is not defined");
    }
    console.log("Generating JWT token");
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1w' });
}
