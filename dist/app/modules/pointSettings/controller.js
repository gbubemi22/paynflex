import { StatusCodes } from "http-status-codes";
import { create, list, listOne, remove, update } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await create(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const List = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await list());
    }
    catch (error) {
        next(error);
    }
};
export const ListOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.status(StatusCodes.OK).json(await listOne(id));
    }
    catch (error) {
        next(error);
    }
};
export const Remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.status(StatusCodes.OK).json(await remove(id));
    }
    catch (error) {
        next(error);
    }
};
export const Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        res.status(StatusCodes.OK).json(await update(id, data));
    }
    catch (error) {
        next(error);
    }
};
