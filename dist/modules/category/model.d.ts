import mongoose from "mongoose";
export type CategoryDocument = mongoose.Document & {
    name: string;
};
declare const Category: mongoose.Model<CategoryDocument, {}, {}, {}, mongoose.Document<unknown, {}, CategoryDocument> & mongoose.Document<unknown, any, any> & {
    name: string;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Category;
