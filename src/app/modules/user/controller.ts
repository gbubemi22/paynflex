import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  create,
  getProfile,
  login,
  requestPasswordReset,
  sendVerificationOtpToPhone,
  updateUserProfile,
  verifyOtpForPasswordReset,
  verifyOtpVerification,
} from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const SendVerificationOtpToPhone: Controller = async (
  req,
  res,
  next
) => {
  try {
    res
      .status(StatusCodes.CREATED)
      .json(await sendVerificationOtpToPhone(req.body.phoneNumber));
  } catch (error) {
    next(error);
  }
};

export const VerifyOtpVerification: Controller = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await verifyOtpVerification(phoneNumber, otp));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    const { phoneNumber, email, password } = req.body;
    res.status(StatusCodes.OK).json(await login(phoneNumber, email, password));
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
