import mongoose from "mongoose";

// Define the schema
const termsPolicySchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed, // Correctly define the type as Mixed
    required: true,
  },
}, {
  timestamps: true, // Add timestamps for createdAt and updatedAt
});

// Check if the model already exists to avoid recompiling it
const TermsPolicy = mongoose.models.TermsPolicy || mongoose.model("TermsPolicy", termsPolicySchema);

export default TermsPolicy;