import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, listOneWallet, topUpWallet, verifyTopUp } from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.CREATED).json(await create(userId));
  } catch (error) {
    next(error);
  }
};

export const ListOneWallet: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await listOneWallet(userId));
  } catch (error) {
    next(error);
  }
};

export const TopUpWallet: Controller = async (req, res, next) => {
  try {
    const { amount, email } = req.body;
    res.status(StatusCodes.OK).json(await topUpWallet(amount, email));
  } catch (error) {
    next(error);
  }
};

export const VerifyTopUp: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
   
    const { reference } = req.params;
    res.status(StatusCodes.OK).json(await verifyTopUp(userId, reference));
  } catch (error) {
    next(error);
  }
};
