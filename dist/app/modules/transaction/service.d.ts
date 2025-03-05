import mongoose from "mongoose";
export declare const listTrx: (userId: string) => Promise<{
    status: boolean;
    message: string;
    data: (mongoose.Document<unknown, {}, import("./model.js").TransactionDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        type: string;
        amount: number;
        trx_id: string;
        status: string;
        data: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (transactionId: string, userId: string) => Promise<{
    status: boolean;
    message: string;
    data: mongoose.Document<unknown, {}, import("./model.js").TransactionDocument> & mongoose.Document<unknown, any, any> & {
        userId: mongoose.Types.ObjectId;
        type: string;
        amount: number;
        trx_id: string;
        status: string;
        data: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const getYearlyTransactionSummary: (userId: string, year?: number) => Promise<{
    status: boolean;
    message: string;
    data: {
        year: number;
        monthly: any[];
        yearlyTotal: any;
    };
}>;
