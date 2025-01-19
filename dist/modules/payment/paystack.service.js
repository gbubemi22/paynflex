import axios from "axios";
import { BadRequestError } from "../../utils/error.js";
const secTKey = process.env.PAYSTACK_SECT;
const paystackUrl = process.env.PAYSTACK_URL;
export const initializePayment = async (paymentData) => {
    try {
        const response = await axios.post(`${paystackUrl}`, paymentData, {
            headers: {
                Authorization: `Bearer ${secTKey}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error initializing payment with Paystack:", error.response ? error.response.data : error.message);
        throw new BadRequestError("Failed to initialize payment");
    }
};
export const verifyPayment = async (reference) => {
    try {
        const verifyUrl = process.env.PAYSTACK_VERIFY;
        const response = await axios.get(`${verifyUrl}/${reference}`, {
            headers: {
                Authorization: `Bearer ${secTKey}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error verifying payment with Paystack:", error.response ? error.response.data : error.message);
        throw new BadRequestError("Failed to verify payment", error);
    }
};
