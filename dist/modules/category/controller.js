import { StatusCodes } from "http-status-codes";
import { create, listAll, listOne, remove, update } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await create(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const ListAll = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await listAll());
    }
    catch (error) {
        next(error);
    }
};
export const ListOne = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await listOne(req.params.id));
    }
    catch (error) {
        next(error);
    }
};
export const Update = async (req, res, next) => {
    try {
        const { name } = req.body;
        res.status(StatusCodes.OK).json(await update(req.params.id, name));
    }
    catch (error) {
        next(error);
    }
};
export const Remove = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await remove(req.params.id));
    }
    catch (error) {
        next(error);
    }
};
