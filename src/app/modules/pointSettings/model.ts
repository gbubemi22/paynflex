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

const PointSettingSchema = new mongoose.Schema<PointSettingsDocument>(
  {
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
  },

  {
    timestamps: true,
    collection: "PointSetting",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const PointSetting = mongoose.model<PointSettingsDocument>(
  "PointSetting",
  PointSettingSchema
);

export default PointSetting;
