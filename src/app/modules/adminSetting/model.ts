import mongoose from "mongoose";

export type AdminSettingDocument = mongoose.Document & {
  type: string;
  rewardPercentage: number;
};

const AdminSettingsSchema = new mongoose.Schema<AdminSettingDocument>(
  {
    type: {
      type: String,
      required: true,
    },
    rewardPercentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "AdminSetting",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const AdminSetting = mongoose.model<AdminSettingDocument>(
  "AdminSetting",
  AdminSettingsSchema
);

export default AdminSetting;
