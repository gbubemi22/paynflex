import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, list, listOne } from "./service.js";
import { uploadToS3 } from "../../utils/aws.js";


export const Create: Controller = async (req, res, next) => {
  try {
     if (!req.files || !req.files.image) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "No image uploaded" });
        }
        const image = req.files.image;
        const images = await uploadToS3(image);
    res.status(StatusCodes.CREATED).json(await create({...req.body, images}));
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
    res.status(StatusCodes.OK).json(await listOne(req.params.id));
  } catch (error) {
    next(error);
  }
};


