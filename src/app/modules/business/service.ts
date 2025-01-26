import { ConflictError, NotFoundError } from "../../utils/error.js";
import Business, { BusDataType } from "./model.js";

export const create = async (payload: BusDataType) => {
  const checkBiz = await Business.findOne({ name: payload.name });

  if (checkBiz) throw new ConflictError(`Business Already exits`);

  const bis = await Business.create(payload);

  return {
    success: true,
    message: `Business Created`,
    data: bis.toJSON(),
  };
};
export const list = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  // Fetch paginated results
  const bis = await Business.find({})
    .skip(skip)
    .limit(limit)
    .populate("category");

  // Get the total count of documents
  const totalCount = await Business.countDocuments();

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    success: true,
    currentPage: page,
    totalPages,
    count: bis.length,
    totalCount,
    message: `Businesses Fetched`,
    data: bis,
  };
};

export const listOne = async (id: string) => {
  const bis = await Business.findById(id).populate("category");
  if (!bis) throw new NotFoundError(`Business not found`);

  return {
    success: true,
    message: `Business Fetched`,
    data: bis,
  };
};

export const update = async (id: string, payload: Partial<BusDataType>) => {
  const existingBiz = await Business.findById(id);
  if (!existingBiz) throw new NotFoundError(`Business not found`);

  const updatedBiz = await Business.findByIdAndUpdate(
    id,
    { ...payload },
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    success: true,
    message: `Business Updated`,
    data: updatedBiz?.toJSON(),
  };
};

export const updateImage = async (id: string, images: string) => {
  const existingBiz = await Business.findById(id);
  if (!existingBiz) throw new NotFoundError(`Business not found`);

  const result = await Business.findOneAndUpdate(
    { _id: id },
    { $set: { images: images } },
    { new: true }
  );

  return {
    success: true,
    message: `Business Updated`,
    data: result?.toJSON(),
  };
};

export const remove = async (id: string) => {
  const existingBiz = await Business.findById(id);
  if (!existingBiz) throw new NotFoundError(`Business not found`);

  await Business.findByIdAndDelete(id);

  return {
    success: true,
    message: `Business Deleted`,
    data: null,
  };
};
