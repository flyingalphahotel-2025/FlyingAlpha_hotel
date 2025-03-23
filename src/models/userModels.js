import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    mobileNumber: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profilePic: {
        type: String,
        default: ''
    },
    dob:{
        type: Date,
    },
    role: {
        type: String,
        enum: ['User', 'SuperAdmin' ],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['Blocked', 'Active'],
        default: 'Active'
    },
    adhaarCard: {
        type: String,
    },
    VoterIdCard: {
        type: String,
    },
    DrivingLicence: {
        type: String,
    },

}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
