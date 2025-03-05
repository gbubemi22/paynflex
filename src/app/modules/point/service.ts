import { BadRequestError, NotFoundError } from "../../utils/error.js";
import PointSetting from "../pointSettings/model.js";
import Wallet from "../wallet/model.js";
import Point from "./model.js";

export const point = async (userId: string) => {
  const point = await Point.findOne({ userId: userId });
  console.log("THE", point);

  //if (!point) throw new NotFoundError(`point not found`);

  return {
    status: true,
    message: `Fetched successfully`,
    data: point,
  };
};

export const convertPoint = async (userId: string, amount: number) => {
  const point = await Point.findOne({ userId });

  if (!point) throw new NotFoundError(`User does not have any points`);

  const pointSettings = await PointSetting.findOne({});
  if (!pointSettings) throw new NotFoundError(`Point settings not configured`);

  if (point.balance < pointSettings.threshold)
    throw new BadRequestError(
      `User does not have enough points. Minimum withdrawal is ${pointSettings.threshold}`
    );

  // Calculate the equivalent wallet amount
  const walletAmount = (amount / pointSettings.point) * pointSettings.value;

  // Update the user's wallet balance
  await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: walletAmount } },
    { new: true }
  );

  // Deduct the redeemed points from the user's point balance
  await Point.findOneAndUpdate(
    { userId },
    { $inc: { balance: -amount } },
    { new: true }
  );

  return {
    success: true,
    message: `Successfully converted ${amount} points to ${walletAmount} in wallet`,
  };
};
