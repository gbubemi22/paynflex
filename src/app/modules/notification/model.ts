import mongoose from "mongoose";
import { user } from "../admin/dashboard.js";

export type NotificationDocument = mongoose.Document & {
  userId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  title: string;
  body: string;
  data?: any;
};

const NotificationSchema = new mongoose.Schema<NotificationDocument>(
  {
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
  },
  {
    timestamps: true,
    collection: "Notification",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Notification = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export default Notification;
