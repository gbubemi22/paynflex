import mongoose from "mongoose";
import { user } from "../admin/dashboard.js";
const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: false,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: false,
    },
}, {
    timestamps: true,
    collection: "Notification",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
