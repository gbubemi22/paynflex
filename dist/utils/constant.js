import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";
export const encodeJwt = ({ data, secretKey = process.env.APP_KEY || "", duration = "24h", }) => {
    return new Promise((ful, rej) => {
        if (!secretKey)
            return rej(new Error("Kindly supply secret key"));
        jwt.sign(data, secretKey, { expiresIn: duration }, (err, token) => {
            if (err)
                rej(err);
            ful(token);
        });
    });
};
// Define possible KYC statuses
export const KYCStatus = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};
export const generateTransactionRef = (prefix = "TRX") => {
    // Generate UUID and remove hyphens
    const uuid = uuidV4().replace(/-/g, "");
    // Take first 12 characters of UUID and combine with prefix
    const reference = `${prefix}_${uuid.substring(0, 12).toUpperCase()}`;
    return reference;
};
export const generateRandomString = (length = 9) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
export function parseJSON(value) {
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return value;
    }
}
