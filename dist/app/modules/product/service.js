import { NotFoundError } from "../../utils/error.js";
import Product from "./model.js";
export const create = async (payload) => {
    const product = await Product.create(payload);
    return {
        success: true,
        message: `Product Created Successful`,
        data: product.toJSON(),
    };
};
export const list = async () => {
    const products = await Product.find({});
    return {
        success: true,
        message: `Business Fetched`,
        data: products,
    };
};
export const listOne = async (id) => {
    const product = await Product.findById(id);
    if (!product)
        throw new NotFoundError(`Business not found`);
    return {
        success: true,
        message: `Business Fetched`,
        data: product,
    };
};
export const remove = async (id) => {
    const product = await Product.findById(id);
    if (!product)
        throw new NotFoundError(`Business not found`);
    await Product.findByIdAndDelete(id);
    return {
        success: true,
        message: `Product Deleted`,
        data: null,
    };
};
export const update = async (id, payload) => {
    // Check if the item exists
    const existingItem = await Product.findOne({
        _id: id,
    });
    if (!existingItem) {
        throw new NotFoundError(`Product not found`);
    }
    // Prepare the update object
    const updateData = { ...payload };
    // Update the item
    const updatedItem = await Product.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true, runValidators: true });
    if (!updatedItem) {
        throw new NotFoundError(`Product not found after update attempt`);
    }
    console.log(updateData.images);
    return {
        success: true,
        message: `Updated successfully`,
        data: updatedItem,
    };
};
