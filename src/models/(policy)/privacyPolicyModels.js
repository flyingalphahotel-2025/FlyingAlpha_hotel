import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
    content :{
        type : mongoose.Schema.Types.Mixed,
        required : true
    }
},{
    timestamps: true
})

export default mongoose.models.PrivacyPolicy || mongoose.model('PrivacyPolicy' , privacyPolicySchema)