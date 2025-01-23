import mongoose from "mongoose";
export type BusinessDocument = mongoose.Document & {
    name: string;
    description: string;
    address: string;
    category: string;
    images: string;
    deleteAt?: Date;
};
export type BusDataType = {
    name: string;
    description: string;
    address: string;
    category: string;
    images: string;
    deleteAt?: Date;
};
declare const Business: mongoose.Model<BusinessDocument, {}, {}, {}, mongoose.Document<unknown, {}, BusinessDocument> & mongoose.Document<unknown, any, any> & {
    name: string;
    description: string;
    address: string;
    category: string;
    images: string;
    deleteAt?: Date;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Business;
