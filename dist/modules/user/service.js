import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, } from "../../utils/error.js";
import User from "./model.js";
import { generateOTP, getOtpExpiryTime, sendSMS, generateReferralCode, } from "../../utils/util.js";
import Otp from "../otp/model.js";
import sendEmail from "../../utils/mailtrap.js";
import { hash } from "../../utils/bcryptiUtils.js";
import Wallet from "../wallet/model.js";
export const create = async (payload) => {
    const checkUser = await User.findOne({
        $or: [{ phone_number: payload.phoneNumber }, { email: payload.email }],
    });
    if (checkUser) {
        // Determine which field is duplicated and throw a ConflictError
        if (checkUser.phoneNumber === payload.phoneNumber) {
            throw new ConflictError(`Phone number already in use`);
        }
        if (checkUser.email === payload.email) {
            throw new ConflictError(`Email already in use`);
        }
    }
    if (payload.referralCode) {
        const referrer = await User.findOne({ referralCode: payload.referralCode });
        if (!referrer) {
            throw new BadRequestError(`Invalid referral code`);
        }
    }
    const user = await User.create({
        ...payload,
        referralCode: generateReferralCode(),
    });
    await Wallet.create({ userId: user.id });
    return {
        success: true,
        message: "Account Created",
        data: {
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            referralCode: user.referralCode,
        },
    };
};
export const sendVerificationOtpToPhone = async (phoneNumber) => {
    const otp = generateOTP();
    const expired_at = getOtpExpiryTime();
    console.log(otp);
    // Check if an OTP already exists for the given phone number
    const existingOtp = await Otp.findOne({ phoneNumber });
    console.log(existingOtp);
    if (existingOtp) {
        existingOtp.otp = otp;
        existingOtp.expired_at = expired_at;
        await Otp.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { otp: otp, expired_at: expired_at } }, { new: true });
    }
    else {
        await Otp.create({
            phoneNumber: phoneNumber,
            otp: otp,
            expired_at: expired_at,
        });
    }
    const message = `Your ${otp} expires in 10 minutes`;
    await sendSMS(phoneNumber, message);
    return {
        success: true,
        message: `Otp sent Successful`,
    };
};
export const verifyOtpVerification = async (phoneNumber, otp) => {
    const result = await Otp.findOne({ phoneNumber: phoneNumber });
    if (!result)
        throw new NotFoundError(`Phone number dose not exits`);
    if (result.otp === undefined && result.otp !== otp) {
        throw new BadRequestError(`No OTP found for the user`);
    }
    ``;
    const otpExpiryDuration = getOtpExpiryTime();
    if (Date.now() > result.expired_at.getTime()) {
        throw new BadRequestError(`Expired OTP`);
    }
    await Otp.findOneAndDelete({ phoneNumber: phoneNumber });
    return {
        success: true,
        message: `Phone number verified`,
    };
};
export const login = async (phoneNumber, email, password) => {
    const user = await User.findOne({
        $or: [{ phoneNumber: phoneNumber }, { email: email }],
    }).exec();
    console.log(user);
    if (!user)
        throw new UnauthorizedError("Incorrect login details");
    if (!(await user.comparePassword(password))) {
        throw new UnauthorizedError("Incorrect login details");
    }
    const token = await user.generateJWT();
    return {
        success: true,
        message: `Welcome ${user.email}`,
        user: {
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            referralCode: user.referralCode,
        },
        token,
    };
};
export const requestPasswordReset = async (identifier, method) => {
    const user = await User.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
    });
    if (!user) {
        throw new NotFoundError(`User not found`);
    }
    const otp = generateOTP();
    const expired_at = getOtpExpiryTime();
    await User.findOneAndUpdate({ _id: user._id }, { $set: { otp: otp, expired_at: expired_at } });
    let message;
    if (method === "phoneNumber") {
        message = `Your OTP is ${otp} and it expires in 10 minutes.`;
        await sendSMS(user.phoneNumber, message);
    }
    else if (method === "email") {
        message = `Your OTP is ${otp} and it expires in 10 minutes.`;
        await sendEmail(user.email, "Password Reset OTP", message);
    }
    return {
        success: true,
        message: `OTP sent successfully to your ${method}.`,
    };
};
export const verifyOtpForPasswordReset = async (identifier, otp, password) => {
    const otpRecord = await User.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
    });
    if (!otpRecord || otpRecord.otp !== otp) {
        throw new BadRequestError(`OTP verification failed`);
    }
    if (otpRecord.expired_at < new Date()) {
        throw new BadRequestError(`Otp expired`);
    }
    const hashedPassword = await hash(password);
    await User.findOneAndUpdate({ _id: otpRecord._id }, { $set: { otp: null, expired_at: null, password: hashedPassword } });
    return {
        success: true,
        message: `Password reset successfully your password.`,
        data: [],
    };
};
export const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user)
        throw new NotFoundError(`User not found`);
    return {
        success: true,
        message: `Password reset successfully your password.`,
        data: user.toJSON(),
    };
};
export const updateUserProfile = async (userId, firstName, lastName, phoneNumber, email) => {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError(`User not found`);
    }
    // Update the user's profile fields
    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }
    if (email) {
        user.email = email;
    }
    // Save the updated user
    const updatedUser = await user.save();
    return {
        success: true,
        message: `User profile updated successfully.`,
        data: updatedUser.toJSON(),
    };
};
