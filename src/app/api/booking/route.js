import connectDB from "@/Lib/dbConnect"

export const POST = async(req) => {
    console.log("Connecting to the database ........")
    connectDB();
    console.log("Connected to the database .......")

    
}