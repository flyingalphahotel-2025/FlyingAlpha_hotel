import mongoose from "mongoose";

const offlineBookingSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }],
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
        required: true
    },
    price:{
        type : Number,
        requird : true
    },
    
}, {
    timestamps: true
})


export default mongoose.models.OfflineBooking || mongoose.model('OfflineBooking' , offlineBookingSchema)