import mongoose from "mongoose";
const AdminSettingsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    rewardPercentage: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: "AdminSetting",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const AdminSetting = mongoose.model("AdminSetting", AdminSettingsSchema);
export default AdminSetting;
