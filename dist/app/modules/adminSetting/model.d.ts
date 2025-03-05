import mongoose from "mongoose";
export type AdminSettingDocument = mongoose.Document & {
    type: string;
    rewardPercentage: number;
};
declare const AdminSetting: mongoose.Model<AdminSettingDocument, {}, {}, {}, mongoose.Document<unknown, {}, AdminSettingDocument> & mongoose.Document<unknown, any, any> & {
    type: string;
    rewardPercentage: number;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default AdminSetting;
