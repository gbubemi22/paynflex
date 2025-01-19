import mongoose, { Types } from "mongoose";

export type UserDocument = mongoose.Document & {
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
};

export type UserDataType = {
  email: string;
  password: string;
  phoneNumber: string;
  referralCode?: string;
  otp: string;
  expired_at: Date;
};
