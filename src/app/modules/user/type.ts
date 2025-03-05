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
  image: string;
  block: boolean;
  kycStatus: boolean;
  deviceToken: string;
  deviceName: string;
  deviceType: string;

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
