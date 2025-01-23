import mongoose from "mongoose";
export type ProductDocument = mongoose.Document & {
    name: string;
    price: number;
    category: string;
    images: string;
};
export type ProductDataType = {
    name: string;
    price: number;
    category: string;
    images: string;
};
declare const Product: mongoose.Model<ProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProductDocument> & mongoose.Document<unknown, any, any> & {
    name: string;
    price: number;
    category: string;
    images: string;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Product;
