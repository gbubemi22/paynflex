import { Controller } from "../../utils/constant.js";
import StatusCode from "http-status-codes";
import {
  create,
  listAllSettings,
  listOneAdminSetting,
  remove,
  update,
} from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    const { type, rewardPercentage } = req.body;
    res.status(StatusCode.CREATED).json(await create(type, rewardPercentage));
  } catch (error) {
    next(error);
  }
};

export const ListOne: Controller = async (req, res, next) => {
  try {
    res.status(StatusCode.OK).json(await listOneAdminSetting(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const ListAllSettings: Controller = async (req, res, next) => {
  try {
    res.status(StatusCode.OK).json(await listAllSettings());
  } catch (error) {
    next(error);
  }
};

export const UpdateSettings: Controller = async (req, res, next) => {
  try {
    const { type, rewardPercentage } = req.body;
    res
      .status(StatusCode.OK)
      .json(await update(req.params.id, rewardPercentage, type));
  } catch (error) {
    next(error);
  }
};

export const Remove: Controller = async (req, res, next) => {
  try {
    res.status(StatusCode.OK).json(await remove(req.params.id));
  } catch (error) {
    next(error);
  }
};
