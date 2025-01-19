import mongoose from "mongoose";
import * as constant from "../../utils/constant.js";

// Define the KYC document interface
export interface KycDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  documentType:
    | "National ID"
    | "International Passport"
    | "Driver’s License"
    | "Permanent Voters Card";
  documentImage: string[];
  status: string;
  rejectionReason?: string;
}

// Define the KYC schema
const KycSchema = new mongoose.Schema<KycDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "insured",
    },
    documentType: {
      type: String,
      enum: [
        "National-ID",
        "International-Passport",
        "Driver-License",
        "Permanent-Voters-Card",
      ],
      required: true,
    },
    documentImage: {
      type: [String], // URL of the uploaded document image
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(constant.KYCStatus),
      default: constant.KYCStatus.PENDING,
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "kyc",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

// Create and export the KYC model
const Kyc = mongoose.model<KycDocument>("kyc", KycSchema);

export default Kyc;
