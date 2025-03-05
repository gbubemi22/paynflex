import mongoose from "mongoose";
const PointSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    collection: "Point",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Point = mongoose.model("Point", PointSchema);
export default Point;
