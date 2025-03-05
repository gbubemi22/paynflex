import { StatusCodes } from "http-status-codes";
import { documents, listAll, listOne } from "./service.js";
import { uploadMultipleAws } from "../../utils/aws.js";
export const Create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!req.files || !req.files.image) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "No image uploaded" });
        }
        const image = req.files.image;
        const { documentType } = req.body;
        const imageUrl = await uploadMultipleAws(image);
        res
            .status(StatusCodes.CREATED)
            .json(await documents(userId, imageUrl, documentType));
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
