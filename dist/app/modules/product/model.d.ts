import mongoose from "mongoose";
export type ProductDocument = mongoose.Document & {
    name: string;
    serviceProvider: string;
    price?: number;
    category: mongoose.Types.ObjectId;
    images: string;
};
export type ProductDataType = {
    name: string;
    serviceProvider: string;
    price?: number;
    category: string;
    images: string;
};
export type UpdateProductData = {
    name?: string;
    serviceProvider?: string;
    price?: number;
    category?: string;
    images?: string;
};
declare const Product: mongoose.Model<ProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProductDocument> & mongoose.Document<unknown, any, any> & {
    name: string;
    serviceProvider: string;
    price?: number;
    category: mongoose.Types.ObjectId;
    images: string;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Product;
