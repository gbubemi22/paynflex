import mongoose from "mongoose";
export type WalletDocument = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    balance: number;
    processedTransactions?: string[];
};
declare const Wallet: mongoose.Model<WalletDocument, {}, {}, {}, mongoose.Document<unknown, {}, WalletDocument> & mongoose.Document<unknown, any, any> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
    processedTransactions?: string[];
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Wallet;
