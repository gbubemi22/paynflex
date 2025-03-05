import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  name: string;
  serviceProvider: string;
  price?: number;
  category: mongoose.Types.ObjectId;
  images: string;
};

export type ProductDataType = {
  name: string;
  serviceProvider: string;
  price?: number;
  category: string;
  images: string;
};

export type UpdateProductData = {
  name?: string;
  serviceProvider?: string;
  price?: number;
  category?: string;
  images?: string;
};

const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    serviceProvider: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: false,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
