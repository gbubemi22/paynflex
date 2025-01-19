import mongoose from "mongoose";

export type OtpDocument = mongoose.Document & {
  phoneNumber: string;
  otp: string;
  expired_at: Date;
};

const OtpSchema = new mongoose.Schema<OtpDocument>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expired_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "Otp",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Otp = mongoose.model<OtpDocument>("Otp", OtpSchema);

export default Otp;
