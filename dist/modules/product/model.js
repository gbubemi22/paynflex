import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
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
