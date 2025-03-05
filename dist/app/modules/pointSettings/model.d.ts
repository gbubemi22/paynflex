import mongoose from "mongoose";
export type PointSettingsDocument = mongoose.Document & {
    point: number;
    value: number;
    threshold: number;
};
export type PointSettingsData = {
    point: number;
    value: number;
    threshold: number;
};
export type PointSettingsDto = {
    point?: number;
    value?: number;
    threshold?: number;
};
declare const PointSetting: mongoose.Model<PointSettingsDocument, {}, {}, {}, mongoose.Document<unknown, {}, PointSettingsDocument> & mongoose.Document<unknown, any, any> & {
    point: number;
    value: number;
    threshold: number;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default PointSetting;
