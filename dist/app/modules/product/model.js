import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    collection: "Product",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Product = mongoose.model("Product", ProductSchema);
export default Product;
