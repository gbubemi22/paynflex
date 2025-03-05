import mongoose from "mongoose";
export type NotificationDocument = mongoose.Document & {
    userId: mongoose.Schema.Types.ObjectId;
    adminId: mongoose.Schema.Types.ObjectId;
    title: string;
    body: string;
    data?: any;
};
declare const Notification: mongoose.Model<NotificationDocument, {}, {}, {}, mongoose.Document<unknown, {}, NotificationDocument> & mongoose.Document<unknown, any, any> & {
    userId: mongoose.Schema.Types.ObjectId;
    adminId: mongoose.Schema.Types.ObjectId;
    title: string;
    body: string;
    data?: any;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Notification;
