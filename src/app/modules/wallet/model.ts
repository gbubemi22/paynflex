import mongoose, { Types } from "mongoose";

export type WalletDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  balance: number;
  processedTransactions?: string[];
};

const WalletSchema = new mongoose.Schema<WalletDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    processedTransactions: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "Wallet",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Wallet = mongoose.model<WalletDocument>("Wallet", WalletSchema);

export default Wallet;
