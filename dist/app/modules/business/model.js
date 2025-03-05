import mongoose from "mongoose";
const BusinessSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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
}, {
    timestamps: true,
    collection: "Business",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Business = mongoose.model("Business", BusinessSchema);
export default Business;
