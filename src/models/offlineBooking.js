import mongoose from "mongoose";
import {customAlphabet} from 'nonoId'

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);


const offlineBookingSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        validate : [(val) => val.length>0 , "At least One User is Required"]
    }],
    checkInDate: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: String,
        required: true
    },
    noOfPersons: {
        type: Number,
        required: true,
        min: 1
    },
    noOfRooms: {
        type: Number,
        required: true,
        min : 1
    },
    roomNumbers: [{
        type: String,
        required: true
    }],
    roomType: {
        type: String,
        required: true
    },
    totalPrice: { 
        type: Number, 
        required: true, 
        min: [0, "Total price cannot be negative"] 
      },
      paidAmount: { 
        type: Number, 
        required: true, 
        min: [0, "Paid amount cannot be negative"], 
        default: 0 
      },
      leftAmount: { 
        type: Number, 
        default: function () { 
          return this.totalPrice - this.paidAmount; 
        } 
      },  
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Partial', 'Refunded'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Other'],
        default: 'Cash'
    },
    specialRequests: {
        type: String,
        default: ''
    },
    bookingStatus: {
        type: String,
        enum: ['Confirmed', 'Cancelled', 'Completed'],
        default: 'Confirmed'
    },
    bookingId: {
        type: String,
        unique: true,
        default: () => `#Alpha${nanoid()}`, 
    },
    cancellationReason: {
        type: String
    }

}, {
    timestamps: true
})


export default mongoose.models.OfflineBooking || mongoose.model('OfflineBooking' , offlineBookingSchema)