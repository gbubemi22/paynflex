import { Controller } from "../../utils/constant.js";
import { StatusCodes } from "http-status-codes";
import { getYearlyTransactionSummary, listOne, listTrx } from "./service.js";

export const ListTrx: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await listTrx(userId));
  } catch (error) {
    next(error);
  }
};

export const ListOne: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { transactionId } = req.params;
    res.status(StatusCodes.OK).json(await listOne(transactionId, userId));
  } catch (error) {
    next(error);
  }
};

export const getYearlyTransactionSummaryController: Controller = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const { year } = req.query;

    const result = await getYearlyTransactionSummary(
      userId,
      year ? Number(year) : undefined
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
