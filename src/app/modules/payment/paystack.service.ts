import axios from "axios";
import { CreatePayStackPaymentDto } from "./interface.js";
import { BadRequestError } from "../../utils/error.js";

const secTKey = process.env.PAYSTACK_SECT as string;
const paystackUrl = process.env.PAYSTACK_URL as string;

export const initializePayment = async (
  paymentData: CreatePayStackPaymentDto
) => {
  try {
    const response = await axios.post(`${paystackUrl}`, paymentData, {
      headers: {
        Authorization: `Bearer ${secTKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error initializing payment with Paystack:",
      error.response ? error.response.data : error.message
    );
    throw new BadRequestError("Failed to initialize payment");
  }
};

export const verifyPayment = async (reference: string) => {
  try {
    const verifyUrl = process.env.PAYSTACK_VERIFY as string;
    const response = await axios.get(`${verifyUrl}/${reference}`, {
      headers: {
        Authorization: `Bearer ${secTKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error verifying payment with Paystack:",
      error.response ? error.response.data : error.message
    );
    throw new BadRequestError("Failed to verify payment", error);
  }
};
