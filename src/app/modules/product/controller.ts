import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, list, listOne, remove, update } from "./service.js";
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
    res.status(StatusCodes.CREATED).json(await create({ ...req.body, images }));
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
    const id = req.params.id;

    let imageUrl: string | undefined;

    // Check if an image was uploaded
    if (req.files && req.files.image) {
      const images = req.files.image;
      imageUrl = await uploadToS3(images);
    }

    res.status(StatusCodes.OK).json(
      await update(id, {
        ...req.body,
        images: imageUrl,
      })
    );
  } catch (error) {
    next(error);
  }
};
