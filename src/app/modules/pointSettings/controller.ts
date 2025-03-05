import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, list, listOne, remove, update } from "./service.js";
import { PointSettingsDto } from "./model.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const List: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await list());
  } catch (error) {
    next(error);
  }
};

export const ListOne: Controller = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(StatusCodes.OK).json(await listOne(id));
  } catch (error) {
    next(error);
  }
};

export const Remove: Controller = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(StatusCodes.OK).json(await remove(id));
  } catch (error) {
    next(error);
  }
};

export const Update: Controller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data: PointSettingsDto = req.body;
    res.status(StatusCodes.OK).json(await update(id, data));
  } catch (error) {
    next(error);
  }
};
