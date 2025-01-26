import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, listAll, listOne, remove, update } from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const ListAll: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await listAll());
  } catch (error) {
    next(error);
  }
};

export const ListOne: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await listOne(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const Update: Controller = async (req, res, next) => {
  try {
    const { name } = req.body;
    res.status(StatusCodes.OK).json(await update(req.params.id, name));
  } catch (error) {
    next(error);
  }
};

export const Remove: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await remove(req.params.id));
  } catch (error) {
    next(error);
  }
};
