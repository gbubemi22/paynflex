import mongoose from "mongoose";
const PointSettingSchema = new mongoose.Schema({
    point: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: "PointSetting",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const PointSetting = mongoose.model("PointSetting", PointSettingSchema);
export default PointSetting;
