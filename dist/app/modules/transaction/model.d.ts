import mongoose from "mongoose";
export type TransactionDocument = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    type: string;
    amount: number;
    trx_id: string;
    status: string;
    data: Date;
};
declare const Transaction: mongoose.Model<TransactionDocument, {}, {}, {}, mongoose.Document<unknown, {}, TransactionDocument> & mongoose.Document<unknown, any, any> & {
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
}, any>;
export default Transaction;
