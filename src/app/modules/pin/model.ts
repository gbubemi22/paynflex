import mongoose from "mongoose";

export type PinDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  pin: string;
  otp: string;
  expired_at: Date;
};

const PinSchema = new mongoose.Schema<PinDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    pin: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
      validate: {
        validator: function (v: string) {
          return /^\d{4}$/.test(v);
        },
        message: "Pin must be exactly 4 digits",
      },
    },
    otp: {
      type: String,
      required: false,
    },
    expired_at: {
      type: Date,
      required: false,
    },
  },

  {
    timestamps: true,
    collection: "Pin",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Pin = mongoose.model<PinDocument>("Pin", PinSchema);

export default Pin;
