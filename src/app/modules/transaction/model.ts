import mongoose from "mongoose";

export type TransactionDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  type: string;
  amount: number;
  trx_id: string;
  status: string;
  data: Date;
};

const TransactionSchema = new mongoose.Schema<TransactionDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
     
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
  },

  {
    timestamps: true,
    collection: "Transaction",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Transaction = mongoose.model<TransactionDocument>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
