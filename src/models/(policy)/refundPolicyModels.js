import mongoose from "mongoose";

const refundPolicySchema = mongoose.Schema({
    content:{
        type:mongoose.Schema.Mixed,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.models.RefundPolicy || mongoose.model('RefundPolicy' , refundPolicySchema)