import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../utils/error.js";
import Category, { CategoryDocument } from "./model.js";

export const create = async (payload: CategoryDocument) => {
  const { name } = payload;
  const check = await Category.findOne({ name });

  if (check) throw new ConflictError(`Category already Exits`);

  const category = await Category.create({ name });

  return {
    success: true,
    message: `Category Updated`,
    data: category?.toJSON(),
  };
};

export const listAll = async () => {
  const categories = await Category.find({});

  return {
    success: true,
    message: `Fetched successfully`,
    data: categories,
  };
};

export const listOne = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) throw new NotFoundError(`Category not found`);

  return {
    success: true,
    message: `Fetched successfully`,
    data: category,
  };
};

export const update = async (id: string, name: string) => {
  const check = await Category.findById(id);
  if (!check) throw new NotFoundError(`Category not found`);

  const result = await Category.findOneAndUpdate(
    { _id: check._id },
    { $set: { name: name } },
    { new: true }
  );

  return {
    success: true,
    message: `Category Updated`,
    data: result?.toJSON(),
  };
};

export const remove = async (id: string) => {
  const check = await Category.findById(id);

  if (!check) throw new NotFoundError(`Category not found`);

  await Category.findByIdAndDelete(id);

  return {
    success: true,
    message: `category Deleted`,
    data: null,
  };
};
