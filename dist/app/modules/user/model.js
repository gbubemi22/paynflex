import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    otp: {
        type: String,
        required: false,
    },
    expired_at: {
        type: Date,
        required: false,
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    verifiedPhoneNumber: {
        type: Boolean,
        default: false,
    },
    referralCode: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    kycStatus: {
        type: Boolean,
        default: false,
    },
    block: {
        type: Boolean,
        default: false,
    },
    deviceName: {
        type: String,
        default: "",
    },
    deviceToken: {
        type: String,
        default: "",
    },
    deviceType: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
    collection: "User",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
UserSchema.methods.generateJWT = function () {
    const expiresIn = process.env.JWT_TOKEN_VALIDITY;
    const token = jwt.sign({
        id: this._id,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
    return token;
};
const User = mongoose.model("User", UserSchema);
export default User;
