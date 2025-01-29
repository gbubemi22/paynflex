import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  changePasswordService,
  create,
  editRole,
  forgetPasswordService,
  getAdminByID,
  getAllAdminService,
  login,
  resetPasswordService,
} from "./service.js";
import { user, getTransactionTotals, trx } from "./dashboard.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.status(StatusCodes.CREATED).json(await login(email, password));
  } catch (error) {
    next(error);
  }
};

export const forgetPassword: Controller = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await forgetPasswordService(req.body.email));
  } catch (error) {
    next(error);
  }
};

export const resetPassword: Controller = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await resetPasswordService(email, password, otp));
  } catch (error) {
    next(error);
  }
};

export const changePassword: Controller = async (req, res, next) => {
  try {
    const agentId = req.user.id;

    const { currentPassword, newPassword } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await changePasswordService(agentId, currentPassword, newPassword));
  } catch (error) {
    next(error);
  }
};

export const GetAllAdminService: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await getAllAdminService());
  } catch (error) {
    next(error);
  }
};

export const GetAdminByID: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await getAdminByID(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const User: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await user());
  } catch (error) {
    next(error);
  }
};

export const Trx: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await trx());
  } catch (error) {
    next(error);
  }
};

export const GetTransactionTotals: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await getTransactionTotals());
  } catch (error) {
    next(error);
  }
};

export const EditRole: Controller = async (req, res, next) => {
  try {
    const { roleId } = req.body;
    const { adminId } = req.params;
    res.status(StatusCodes.OK).json(await editRole(adminId, roleId));
  } catch (error) {
    next(error);
  }
};
