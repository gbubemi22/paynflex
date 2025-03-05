import mongoose from "mongoose";

export type PointDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  balance: number;
};

const PointSchema = new mongoose.Schema<PointDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      required: false,
    },
  },

  {
    timestamps: true,
    collection: "Point",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Point = mongoose.model<PointDocument>("Point", PointSchema);

export default Point;
