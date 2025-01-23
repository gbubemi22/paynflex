import { StatusCodes } from "http-status-codes";
import { changePasswordService, create, forgetPasswordService, getAdminByID, getAllAdminService, login, resetPasswordService, } from "./service.js";
import { user, getTransactionTotals, trx } from "./dashboard.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await create(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        res.status(StatusCodes.CREATED).json(await login(email, password));
    }
    catch (error) {
        next(error);
    }
};
export const forgetPassword = async (req, res, next) => {
    try {
        res
            .status(StatusCodes.OK)
            .json(await forgetPasswordService(req.body.email));
    }
    catch (error) {
        next(error);
    }
};
export const resetPassword = async (req, res, next) => {
    try {
        const { email, password, otp } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await resetPasswordService(email, password, otp));
    }
    catch (error) {
        next(error);
    }
};
export const changePassword = async (req, res, next) => {
    try {
        const agentId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await changePasswordService(agentId, currentPassword, newPassword));
    }
    catch (error) {
        next(error);
    }
};
export const GetAllAdminService = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await getAllAdminService());
    }
    catch (error) {
        next(error);
    }
};
export const GetAdminByID = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await getAdminByID(req.params.id));
    }
    catch (error) {
        next(error);
    }
};
export const User = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await user());
    }
    catch (error) {
        next(error);
    }
};
export const Trx = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await trx());
    }
    catch (error) {
        next(error);
    }
};
export const GetTransactionTotals = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await getTransactionTotals());
    }
    catch (error) {
        next(error);
    }
};
