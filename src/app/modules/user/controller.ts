import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import useragent from "express-useragent";
import {
  code,
  create,
  getProfile,
  login,
  requestPasswordReset,
  updateProfile,
  updateUserProfile,
  verifyEmail,
  verifyOtpForPasswordReset,
} from "./service.js";
import { convertPoint, point } from "../point/service.js";
import { uploadToS3 } from "../../utils/aws.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const VerifyEmail: Controller = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    res.status(StatusCodes.CREATED).json(await verifyEmail(email, otp));
  } catch (error) {
    next(error);
  }
};

// export const SendVerificationOtpToPhone: Controller = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     res
//       .status(StatusCodes.CREATED)
//       .json(await sendVerificationOtpToPhone(req.body.phoneNumber));
//   } catch (error) {
//     next(error);
//   }
// };

// export const VerifyOtpVerification: Controller = async (req, res, next) => {
//   try {
//     const { phoneNumber, otp } = req.body;
//     res
//       .status(StatusCodes.OK)
//       .json(await verifyOtpVerification(phoneNumber, otp));
//   } catch (error) {
//     next(error);
//   }
// };

export const Login: Controller = async (req, res, next) => {
  try {
    const deviceName =
      req.useragent?.platform && req.useragent.platform !== "unknown"
        ? req.useragent.platform
        : req.headers["user-agent"] || "Unknown"; // ✅ Fallback to raw user-agent

    const deviceType = req.useragent?.isMobile ? "Mobile" : "Desktop";

    console.log("Device:", deviceName); // ✅ Debugging

    const { phoneNumber, email, password, deviceToken } = req.body;

    res
      .status(StatusCodes.OK)
      .json(
        await login(
          phoneNumber,
          email,
          password,
          deviceToken,
          deviceName,
          deviceType
        )
      );
  } catch (error) {
    next(error);
  }
};

export const RequestPasswordReset: Controller = async (req, res, next) => {
  try {
    const { identifier, method } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await requestPasswordReset(identifier, method));
  } catch (error) {
    next(error);
  }
};

export const VerifyOtpForPasswordReset: Controller = async (req, res, next) => {
  try {
    const { identifier, otp, password } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await verifyOtpForPasswordReset(identifier, otp, password));
  } catch (error) {
    next(error);
  }
};

export const GetProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await getProfile(userId));
  } catch (error) {
    next(error);
  }
};

export const UpdateUserProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phoneNumber, email } = req.body;
    res
      .status(StatusCodes.OK)
      .json(
        await updateUserProfile(userId, firstName, lastName, phoneNumber, email)
      );
  } catch (error) {
    next(error);
  }
};

export const Code: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await code(userId));
  } catch (error) {
    next(error);
  }
};

export const UpdateProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!req.files || !req.files.image) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No image uploaded" });
    }
    const images = req.files.image;
    const image = await uploadToS3(images);
    res.status(StatusCodes.CREATED).json(await updateProfile(userId, image));
  } catch (error) {
    next(error);
  }
};

export const Point: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    res.status(StatusCodes.OK).json(await point(userId));
  } catch (error) {
    next(error);
  }
};

export const ConvertPoint: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    res.status(StatusCodes.OK).json(await convertPoint(userId, amount));
  } catch (error) {
    next(error);
  }
};
