import mongoose from "mongoose";
export interface KycDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    documentType: "National ID" | "International Passport" | "Driver’s License" | "Permanent Voters Card";
    documentImage: string[];
    status: string;
    rejectionReason?: string;
}
declare const Kyc: mongoose.Model<KycDocument, {}, {}, {}, mongoose.Document<unknown, {}, KycDocument> & KycDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Kyc;
