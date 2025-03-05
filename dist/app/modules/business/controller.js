import { StatusCodes } from "http-status-codes";
import { create, list, listOne, remove, update, updateImage, } from "./service.js";
import { uploadToS3 } from "../../utils/aws.js";
export const Create = async (req, res, next) => {
    try {
        if (!req.files || !req.files.image) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "No image uploaded" });
        }
        const image = req.files.image;
        const images = await uploadToS3(image);
        res.status(StatusCodes.CREATED).json(await create({ ...req.body, images }));
    }
    catch (error) {
        next(error);
    }
};
export const List = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        res.status(StatusCodes.OK).json(await list(page, limit));
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
        let images = req.body.images; // Default to existing images
        // Check if a new image is uploaded
        if (req.files && req.files.image) {
            const image = req.files.image;
            images = await uploadToS3(image); // Upload new image to S3
        }
        // Update the business with the new data and image
        const updatedBusiness = await update(req.params.id, {
            ...req.body,
            images, // Ensure images are included in the payload
        });
        res.status(StatusCodes.OK).json(updatedBusiness);
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
export const UpdateImage = async (req, res, next) => {
    try {
        // Check if the file exists
        if (!req.files || !req.files.image) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "No image found" });
        }
        // Access the file
        const image = req.files.image;
        // Upload the file to S3 (assuming uploadToS3 expects the file object)
        const images = await uploadToS3(image);
        // Update the business image
        const { id } = req.params;
        res.status(StatusCodes.CREATED).json(await updateImage(id, images));
    }
    catch (error) {
        next(error);
    }
};
