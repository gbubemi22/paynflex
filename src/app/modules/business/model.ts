import mongoose from "mongoose";

export type BusinessDocument = mongoose.Document & {
  name: string;
  description: string;
  address: string;
  category: string;
  images: string;
  deleteAt?: Date;
};

export type BusDataType = {
  name: string;
  description: string;
  address: string;
  category: string;
  images: string;
  deleteAt?: Date;
};

const BusinessSchema = new mongoose.Schema<BusinessDocument>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    images: {
      type: String,
      required: true,
    },
    deleteAt: {
      type: Date,
      required: false,
      index: { expireAfterSeconds: 0 },
    },
  },

  {
    timestamps: true,
    collection: "Business",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Business = mongoose.model<BusinessDocument>("Business", BusinessSchema);

export default Business;
