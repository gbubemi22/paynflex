import { NotFoundError } from "../../utils/error.js";
import PointSetting, { PointSettingsData, PointSettingsDto } from "./model.js";

export const create = async (payload: PointSettingsData) => {
  const point = await PointSetting.create(payload);
  console.log(point);
  return {
    status: true,
    message: `Created successfully`,
    data: point,
  };
};

export const list = async () => {
  const point = await PointSetting.find();

  return {
    status: true,
    message: `Fetched successfully`,
    data: point,
  };
};

export const listOne = async (id: string) => {
  const point = await PointSetting.findById(id);

  if (!point) throw new NotFoundError(`Point not found`);

  return {
    status: true,
    message: `Fetched successfully`,
    data: point,
  };
};

export const remove = async (id: string) => {
  const point = await PointSetting.findById(id);

  if (!point) throw new NotFoundError(`Point not found`);

  await PointSetting.findOneAndDelete({ id });

  return {
    status: true,
    message: `Deleted successfully`,
    data: [],
  };
};

export const update = async (id: string, data: PointSettingsDto) => {
  const point = await PointSetting.findById(id);

  if (!point) throw new NotFoundError(`Point not found`);

  const result = await PointSetting.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        point: data.point ?? point.point,
        value: data.value ?? point.value,
        threshold: data.threshold ?? point.threshold,
      },
    },
    { new: true }
  );

  return {
    status: true,
    message: `Deleted successfully`,
    data: result,
  };
};
