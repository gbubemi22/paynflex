import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  name: string;
  price: number;
  category: string;
  images: string;
};

export type ProductDataType = {
     name: string;
     price: number;
     category: string;
     images: string;
};

const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["AIRTIME", "DATA", "CABLE", "INTERNET"],
    },

    images: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
    collection: "Product",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
