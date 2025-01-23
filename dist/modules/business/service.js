import { ConflictError, NotFoundError } from "../../utils/error.js";
import Business from "./model.js";
export const create = async (payload) => {
    const checkBiz = await Business.findOne({ name: payload.name });
    if (checkBiz)
        throw new ConflictError(`Business Already exits`);
    const bis = await Business.create(payload);
    return {
        success: true,
        message: `Business Created`,
        data: bis.toJSON(),
    };
};
export const list = async () => {
    const bis = await Business.find({});
    return {
        success: true,
        message: `Business Fetched`,
        data: bis,
    };
};
export const listOne = async (id) => {
    const bis = await Business.findById(id);
    if (!bis)
        throw new NotFoundError(`Business not found`);
    return {
        success: true,
        message: `Business Fetched`,
        data: bis,
    };
};
