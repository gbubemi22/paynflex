import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    trx_id: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        default: "PENDING",
    },
}, {
    timestamps: true,
    collection: "Transaction",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
