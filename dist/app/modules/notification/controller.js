import { StatusCodes } from "http-status-codes";
import { list, listOne } from "./service.js";
export const ListOne = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        res.status(StatusCodes.OK).json(await listOne(id, userId));
    }
    catch (error) {
        next(error);
    }
};
export const List = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.OK).json(await list(userId));
    }
    catch (error) {
        next(error);
    }
};
