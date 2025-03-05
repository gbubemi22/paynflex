import { ConflictError, NotFoundError } from "../../utils/error.js";
import AdminSetting from "./model.js";

export const create = async (type: string, rewardPercentage: number) => {
  const checkType = await AdminSetting.findOne({ type: type });

  if (checkType) throw new ConflictError(`Settings already exits`);
  // Create admin settings
  const adminSettings = new AdminSetting({
    rewardPercentage,
    type,
  });

  await adminSettings.save();

  return {
    success: true,
    message: `Admin settings created`,
    data: adminSettings.toJSON(),
  };
};

export const listOneAdminSetting = async (id: string) => {
  const adminSetting = await AdminSetting.findById(id);

  if (!adminSetting) throw new NotFoundError(`Admin setting not found`);

  return {
    success: true,
    message: `Fetched Successfully`,
    data: adminSetting,
  };
};

export const listAllSettings = async () => {
  const adminSettings = await AdminSetting.find();

  return {
    success: true,
    message: `Fetched Successfully`,
    data: adminSettings,
  };
};

export const update = async (
  id: string,
  rewardPercentage?: number,
  type?: string
) => {
  const adminSetting = await AdminSetting.findById(id);

  if (!adminSetting) throw new NotFoundError(`Admin setting not found`);

  // Update fields if provided
  if (type !== undefined) {
    adminSetting.type = type;
  }

  if (rewardPercentage !== undefined) {
    adminSetting.rewardPercentage = rewardPercentage;
  }

  // Save the updated document
  await adminSetting.save();

  return {
    success: true,
    message: `Admin setting updated`,
    data: adminSetting.toJSON(),
  };
};

export const remove = async (id: string) => {
  const adminSetting = await AdminSetting.findByIdAndDelete(id);

  if (!adminSetting) throw new NotFoundError(`Admin setting not found`);

  await AdminSetting.findByIdAndDelete(id);

  return {
    success: true,
    message: `Admin setting deleted`,
  };
};
