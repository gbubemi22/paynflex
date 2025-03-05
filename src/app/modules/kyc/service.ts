import { BadRequestError, NotFoundError } from "../../utils/error.js";
import User from "../user/model.js";
import Kyc from "./model.js";

export const documents = async (
  userId: string,
  documentImage: string[],
  documentType: string
) => {
  const checkUser = await User.findById(userId);

  if (!checkUser) throw new NotFoundError(`User not found`);

  if (!documentType || !documentImage) {
    throw new BadRequestError("Document type and image are required.");
  }

  const kyc = await Kyc.create({
    userId,
    documentImage,
    documentType,
  });

  return {
    status: true,
    message: `Kyc submitted successfully`,
    data: kyc,
  };
};

export const listAll = async () => {
  const results = await Kyc.find({});

  return {
    status: true,
    message: `Fetched successfully`,
    data: results,
  };
};

export const listOne = async (id: string) => {
  const results = await Kyc.findById(id);

  if (!results) throw new NotFoundError(`Kyc not found`);

  return {
    status: true,
    message: `Image uploaded successfully`,
    data: results,
  };
};
