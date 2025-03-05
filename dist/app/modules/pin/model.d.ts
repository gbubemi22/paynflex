import mongoose from "mongoose";
export type PinDocument = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    pin: string;
    otp: string;
    expired_at: Date;
};
declare const Pin: mongoose.Model<PinDocument, {}, {}, {}, mongoose.Document<unknown, {}, PinDocument> & mongoose.Document<unknown, any, any> & {
    userId: mongoose.Types.ObjectId;
    pin: string;
    otp: string;
    expired_at: Date;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Pin;
