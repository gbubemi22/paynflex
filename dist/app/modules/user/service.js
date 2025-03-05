import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, } from "../../utils/error.js";
import User from "./model.js";
import { generateOTP, getOtpExpiryTime, sendSMS, generateReferralCode, } from "../../utils/util.js";
import sendEmail from "../../utils/mailtrap.js";
import { hash } from "../../utils/bcryptiUtils.js";
import Wallet from "../wallet/model.js";
import Point from "../point/model.js";
import PointSetting from "../pointSettings/model.js";
export const create = async (payload) => {
    const checkUser = await User.findOne({
        $or: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
    });
    if (checkUser) {
        if (checkUser.phoneNumber === payload.phoneNumber) {
            throw new ConflictError(`Phone number already in use`);
        }
        if (checkUser.email === payload.email) {
            throw new ConflictError(`Email already in use`);
        }
    }
    let referrer = null;
    if (payload.referralCode) {
        referrer = await User.findOne({ referralCode: payload.referralCode });
        if (!referrer) {
            throw new BadRequestError(`Invalid referral code`);
        }
    }
    const otp = generateOTP();
    const expired_at = getOtpExpiryTime();
    const user = await User.create({
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber ?? "",
        referralCode: generateReferralCode(),
        otp,
        expired_at,
    });
    await Wallet.create({ userId: user._id });
    await Point.create({ userId: user._id });
    if (referrer) {
        const pointSettings = await PointSetting.findOne({});
        console.log(pointSettings);
        if (pointSettings) {
            await Point.findOneAndUpdate({ userId: referrer._id }, { $inc: { balance: pointSettings.point } }, { upsert: true, new: true });
        }
    }
    const message = `Your OTP is ${otp} and it expires in 10 minutes.`;
    await sendEmail(user.email, "Verify Email", message);
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
export const verifyEmail = async (email, otp) => {
    const user = await User.findOne({ email: email });
    if (!user)
        throw new NotFoundError(`User not found`);
    if (user.otp !== otp)
        throw new BadRequestError(`Incorrect Otp`);
    await User.findByIdAndUpdate({ _id: user._id }, { $set: { verifiedEmail: true, otp: null, expired_at: null } }, { new: true });
    return {
        status: true,
        message: `Email Verified Successfuly`,
        data: [],
    };
};
// // export const sendVerificationOtpToPhone = async (phoneNumber: string) => {
// //   const otp = generateOTP();
// //   const expired_at = getOtpExpiryTime();
// //   console.log(otp);
// //   // Check if an OTP already exists for the given phone number
// //   const existingOtp = await Otp.findOne({ phoneNumber });
// //   console.log(existingOtp);
// //   if (existingOtp) {
// //     existingOtp.otp = otp;
// //     existingOtp.expired_at = expired_at;
// //     await Otp.findOneAndUpdate(
// //       { phoneNumber: phoneNumber },
// //       { $set: { otp: otp, expired_at: expired_at } },
// //       { new: true }
// //     );
// //   } else {
// //     await Otp.create({
// //       phoneNumber: phoneNumber,
// //       otp: otp,
// //       expired_at: expired_at,
// //     });
// //   }
//   const message = `Your ${otp} expires in 10 minutes`;
//   await sendSMS(phoneNumber, message);
//   return {
//     success: true,
//     message: `Otp sent Successful`,
//   };
// };
// export const verifyOtpVerification = async (
//   phoneNumber: string,
//   otp: string
// ) => {
//   const result = await Otp.findOne({ phoneNumber: phoneNumber });
//   if (!result) throw new NotFoundError(`Phone number dose not exits`);
//   if (result.otp === undefined && result.otp !== otp) {
//     throw new BadRequestError(`No OTP found for the user`);
//   }
//   ``;
//   const otpExpiryDuration = getOtpExpiryTime();
//   if (Date.now() > result.expired_at.getTime()) {
//     throw new BadRequestError(`Expired OTP`);
//   }
//   await Otp.findOneAndDelete({ phoneNumber: phoneNumber });
//   return {
//     success: true,
//     message: `Phone number verified`,
//   };
// };
export const login = async (phoneNumber, email, password, deviceToken, deviceName, deviceType) => {
    const user = await User.findOne({
        $or: [{ phoneNumber: phoneNumber }, { email: email }],
    });
    console.log("USER", "USER");
    if (!user)
        throw new UnauthorizedError("Incorrect login details");
    if (!(await user.comparePassword(password))) {
        throw new UnauthorizedError("Incorrect login details");
    }
    const token = await user.generateJWT();
    console.log(token);
    // Sanitize input values with defaults
    const sanitizedDeviceToken = deviceToken || "";
    const sanitizedDeviceName = deviceName || "";
    const sanitizedDeviceType = deviceType || "web"; // Default to "web" if not provided
    console.log("Sanitized Device Token:", sanitizedDeviceToken);
    console.log("Sanitized Device Name:", sanitizedDeviceName);
    console.log("Sanitized Device Type:", sanitizedDeviceType);
    let data;
    if (user.deviceType !== deviceType) {
        data = await User.findOneAndUpdate({ _id: user.id }, {
            $set: {
                deviceName,
                deviceToken,
                deviceType,
            },
        }, { new: true, runValidators: true });
    }
    return {
        success: true,
        message: `Welcome ${user.email}`,
        user: {
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            referralCode: user.referralCode,
            deviceType: data?.deviceType,
            deviceToken: data?.deviceToken,
            deviceName: data?.deviceName,
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
export const code = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user)
        throw new NotFoundError(`User not found`);
    return {
        status: true,
        message: `Fetched Successfully`,
        data: user.referralCode,
    };
};
export const updateProfile = async (userId, image) => {
    const user = await User.findById(userId).select("-password");
    if (!user)
        throw new NotFoundError(`User not found`);
    const result = await User.findOneAndUpdate({ _id: userId }, { $set: { image: image } });
    return {
        status: true,
        message: `Image added Successfully`,
        data: result,
    };
};
