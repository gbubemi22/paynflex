import mongoose from "mongoose";
export type PointDocument = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    balance: number;
};
declare const Point: mongoose.Model<PointDocument, {}, {}, {}, mongoose.Document<unknown, {}, PointDocument> & mongoose.Document<unknown, any, any> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Point;
