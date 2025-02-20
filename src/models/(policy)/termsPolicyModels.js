import mongoose from "mongoose";

const termsPolicySchema = mongoose.Schema({
    content :{
        type:mongoose.Schema.Mixed,
        required: true
    }
},{
    timestamps:true
})

export default mongoose.models.TermsPolicy || mongoose.model('TermsPolicy' , termsPolicySchema)