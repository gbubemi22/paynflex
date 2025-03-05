import mongoose from "mongoose";

export type CategoryDocument = mongoose.Document & {
  name: string;
};

const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Category",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
