import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    noOfPersons: {
        type: Number,
        required: true
    },
    noOfRooms: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        enum: ["Executive Room", "Deluxe Room"],
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
`