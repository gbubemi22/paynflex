import { NotFoundError } from "../../utils/error.js";
import admin from "../../utils/firebase.js";
import Notification from "./model.js";

export const sendPushNotification = async (
  token: string,
  title: string,
  body: string,
  data: any = {}
) => {
  const message = {
    token,
    notification: { title, body },
    data, // Optional extra data
  };

  try {
    await admin.messaging().send(message);
    console.log("Push notification sent successfully!");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

export const listOne = async (id: string, userId: string) => {
  const notification = await Notification.findOne({ _id: id, userId: userId });

  if (!notification) throw new NotFoundError(`Notification not found `);

  return {
    status: true,
    message: `Fetched Successfully`,
    data: notification,
  };
};

export const list = async (userId: string) => {
  const notification = await Notification.findOne({ userId: userId });

  if (!notification) throw new NotFoundError(`Notification not found `);

  return {
    status: true,
    message: `Fetched Successfully`,
    data: notification,
  };
};
