import mongoose from "mongoose";
export type AdminDocument = mongoose.Document & {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: mongoose.Types.ObjectId;
    verifiedEmail: boolean;
    verifiedNumber: boolean;
    block: boolean;
    otp?: string;
    expired_at?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJWT(): Promise<string>;
};
export type AdminDatatype = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
declare const Admin: mongoose.Model<AdminDocument, {}, {}, {}, mongoose.Document<unknown, {}, AdminDocument> & mongoose.Document<unknown, any, any> & {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: mongoose.Types.ObjectId;
    verifiedEmail: boolean;
    verifiedNumber: boolean;
    block: boolean;
    otp?: string;
    expired_at?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJWT(): Promise<string>;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Admin;
