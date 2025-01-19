import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  create,
  initiateResetPin,
  verifyPin,
  verifyPinRest,
} from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pin } = req.body;
    res.status(StatusCodes.CREATED).json(await create(userId, pin));
  } catch (error) {
    next(error);
  }
};

export const VerifyPin: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pin } = req.body;
    res.status(StatusCodes.CREATED).json(await verifyPin(userId, pin));
  } catch (error) {
    next(error);
  }
};

export const InitiateResetPin: Controller = async (req, res, next) => {
  try {
    const { identifier, method } = req.body;
    
    res
      .status(StatusCodes.CREATED)
      .json(await initiateResetPin(identifier, method));
  } catch (error) {
    next(error);
  }
};

export const VerifyPinRest: Controller = async (req, res, next) => {
  try {
    const { identifier, otp, pin } = req.body;
    res
      .status(StatusCodes.CREATED)
      .json(await verifyPinRest(identifier, otp, pin));
  } catch (error) {
    next(error);
  }
};
