import { generateRandomString } from "../../utils/constant.js";
import { BadRequestError, NotFoundError } from "../../utils/error.js";
import { initializePayment, verifyPayment, } from "../payment/paystack.service.js";
import User from "../user/model.js";
import Wallet from "./model.js";
export const create = async (userId) => {
    const checkUser = await User.findById(userId);
    if (!checkUser)
        throw new NotFoundError(`User not found`);
    const wallet = await Wallet.create({ userId });
    return {
        success: true,
        message: `Wallet created`,
        data: wallet.toJSON(),
    };
};
export const listOneWallet = async (userId) => {
    const wallet = await Wallet.findOne({ userId: userId })
        .populate({
        path: "userId",
        select: "-password -__v",
    })
        .exec();
    if (!wallet)
        throw new NotFoundError(`wallet not found`);
    return {
        success: true,
        message: `Fetched Successfully`,
        data: wallet.toJSON(),
    };
};
export const topUpWallet = async (amount, email, address) => {
    const ref = generateRandomString(9);
    const payload = {
        amount,
        email,
        reference: ref,
    };
    const paymentUrl = await initializePayment(payload);
    console.log(paymentUrl);
    return {
        paymentUrl,
        reference: payload.reference,
    };
};
export const verifyTopUp = async (userId, reference) => {
    // Call Paystack verify
    const transaction = await verifyPayment(reference);
    console.log("Transaction details:", transaction);
    if (transaction.data.status === "success") {
        const wallet = await Wallet.findOne({ userId: userId });
        if (!wallet) {
            throw new NotFoundError("Wallet not found");
        }
        if (wallet.processedTransactions &&
            wallet.processedTransactions.includes(reference)) {
            console.log("Transaction already processed:", reference);
            throw new BadRequestError(`Transaction already processed:", ${reference}`, 400);
        }
        // Update wallet balance
        const currentBalance = parseFloat(wallet.balance.toString());
        const transactionAmount = parseFloat(transaction.data.amount);
        const newBalance = currentBalance + transactionAmount;
        console.log("Updating wallet balance:", {
            currentBalance,
            transactionAmount,
            newBalance,
        });
        const updatedWallet = await Wallet.findOneAndUpdate({ userId: userId }, {
            $inc: { balance: transactionAmount },
            $push: { processedTransactions: reference },
        }, { new: true });
        console.log("Updated Wallet:", updatedWallet);
    }
    else {
        console.error("Transaction verification failed:", transaction);
        throw new BadRequestError("Transaction verification failed");
    }
};
