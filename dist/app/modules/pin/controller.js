import { StatusCodes } from "http-status-codes";
import { create, initiateResetPin, verifyPin, verifyPinRest, } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { pin } = req.body;
        res.status(StatusCodes.CREATED).json(await create(userId, pin));
    }
    catch (error) {
        next(error);
    }
};
export const VerifyPin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { pin } = req.body;
        res.status(StatusCodes.CREATED).json(await verifyPin(userId, pin));
    }
    catch (error) {
        next(error);
    }
};
export const InitiateResetPin = async (req, res, next) => {
    try {
        const { identifier, method } = req.body;
        res
            .status(StatusCodes.CREATED)
            .json(await initiateResetPin(identifier, method));
    }
    catch (error) {
        next(error);
    }
};
export const VerifyPinRest = async (req, res, next) => {
    try {
        const { identifier, otp, pin } = req.body;
        res
            .status(StatusCodes.CREATED)
            .json(await verifyPinRest(identifier, otp, pin));
    }
    catch (error) {
        next(error);
    }
};
