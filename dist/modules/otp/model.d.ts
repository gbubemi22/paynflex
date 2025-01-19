import mongoose from "mongoose";
export type OtpDocument = mongoose.Document & {
    phoneNumber: string;
    otp: string;
    expired_at: Date;
};
declare const Otp: mongoose.Model<OtpDocument, {}, {}, {}, mongoose.Document<unknown, {}, OtpDocument> & mongoose.Document<unknown, any, any> & {
    phoneNumber: string;
    otp: string;
    expired_at: Date;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Otp;
