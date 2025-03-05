import mongoose from "mongoose";
const PinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    pin: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
        validate: {
            validator: function (v) {
                return /^\d{4}$/.test(v);
            },
            message: "Pin must be exactly 4 digits",
        },
    },
    otp: {
        type: String,
        required: false,
    },
    expired_at: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
    collection: "Pin",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Pin = mongoose.model("Pin", PinSchema);
export default Pin;
