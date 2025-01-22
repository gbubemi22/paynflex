import mongoose from "mongoose";
import { UserDocument } from "./type.js";
declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & mongoose.Document<unknown, any, any> & {
    email: string;
    password: string;
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
    otp: string;
    expired_at: Date;
    verifiedEmail: boolean;
    verifiedPhoneNumber: boolean;
    referralCode?: string;
    block: boolean;
    kycStatus: boolean;
    lastLoginDevice: {
        userAgent: String;
        appVersion: String;
        platform: String;
        platformVersion: String;
        device: String;
        notificationToken: String;
        expoPushNotificationToken: String;
        devicePushNotificationToken: String;
    };
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJWT(): Promise<string>;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
