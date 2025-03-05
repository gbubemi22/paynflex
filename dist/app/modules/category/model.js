import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "Category",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Category = mongoose.model("Category", CategorySchema);
export default Category;
