import mongoose from "mongoose";
export declare const create: (userId: string) => Promise<{
    success: boolean;
    message: string;
    data: mongoose.FlattenMaps<mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        balance: number;
        processedTransactions?: string[];
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const listOneWallet: (userId: string) => Promise<{
    success: boolean;
    message: string;
    data: mongoose.FlattenMaps<mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        balance: number;
        processedTransactions?: string[];
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const topUpWallet: (amount: number, email: string, address?: string) => Promise<{
    paymentUrl: any;
    reference: string;
}>;
export declare const verifyTopUp: (userId: string, reference: string) => Promise<void>;
