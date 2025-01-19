import sendEmail from "../../utils/mailtrap.js";
import { BadRequestError, NotFoundError } from "../../utils/error.js";
import User from "../user/model.js";
import Pin from "./model.js";
import { generateOTP, getOtpExpiryTime, sendSMS } from "../../utils/util.js";

export const create = async (userId: string, pin: string) => {
  const user = await User.findById(userId);

  if (!user) throw new NotFoundError(`User not found`);

  await Pin.create({ userId, pin });

  return {
    success: true,
    message: `Created Successfully`,
    data: {},
  };
};

export const verifyPin = async (userId: string, pin: string) => {
  const pinInfo = await Pin.findOne({ userId });

  if (!pinInfo) {
    throw new NotFoundError("User does not have Pin");
  }

  if (pinInfo.pin !== pin) {
    throw new BadRequestError("Incorrect pin");
  }

  return {
    success: true,
    message: "Pin verified successfully",
    data: {},
  };
};

export const initiateResetPin = async (
  identifier: string,
  method: "email" | "phoneNumber"
) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { phoneNumber: identifier }],
  });

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  // Generate and send OTP
  const otp = generateOTP();
  const expired_at = getOtpExpiryTime();

  await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { otp: otp, expired_at: expired_at } }
  );

  let message;
  if (method === "phoneNumber") {
    message = `Your OTP is ${otp} and it expires in 10 minutes.`;
    await sendSMS(user.phoneNumber, message);
  } else if (method === "email") {
    message = `Your OTP is ${otp} and it expires in 10 minutes.`;
    await sendEmail(user.email, "Password Reset OTP", message);
  }

  return {
    success: true,
    message: "OTP sent to your email or Phone",
    data: {},
  };
};

export const verifyPinRest = async (
  identifier: string,
  otp: string,
  pin: string
) => {
  const otpRecord = await User.findOne({
    $or: [{ email: identifier }, { phoneNumber: identifier }],
  });

  if (
    !otpRecord ||
    otpRecord.otp !== otp ||
    otpRecord.expired_at < new Date()
  ) {
    throw new BadRequestError(`OTP verification failed`);
  }

  await User.findOneAndUpdate(
    { _id: otpRecord._id },
    { $set: { otp: null, expired_at: null } }
  );

  await Pin.findOneAndUpdate(
    {
      userId: otpRecord._id,
    },
    {
      $set: { pin: pin },
    }
  );

  return {
    success: true,
    message: `Pin reset successfully.`,
  };
};
