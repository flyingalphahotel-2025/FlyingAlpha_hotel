import connectDB from "@/Lib/dbConnect";
import privacyPolicyModels from "@/models/(policy)/privacyPolicyModels";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
      console.log("Connecting to the database...");
      await connectDB();
      console.log("Connected to the database.");
  
      const PrivacyPolicy = await privacyPolicyModels.findOne();
      
      if (!PrivacyPolicy) {
        console.error("No privacy policy found.");
        return NextResponse.json({ msg: "No privacy policy found." }, { status: 404 });
      }
  
      console.log("Fetched privacy policy:");
      return NextResponse.json(PrivacyPolicy, { status: 200 });
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      return NextResponse.json({ msg: "Error fetching privacy policy", error: error.message }, { status: 500 });
    }
};