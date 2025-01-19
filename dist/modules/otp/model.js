import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expired_at: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
    collection: "Otp",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;
