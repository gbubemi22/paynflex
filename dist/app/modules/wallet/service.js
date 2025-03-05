import mongoose from "mongoose";
import { generateRandomString, generateTransactionRef, } from "../../utils/constant.js";
import { BadRequestError, NotFoundError } from "../../utils/error.js";
import { initializePayment, verifyPayment, } from "../payment/paystack.service.js";
import User from "../user/model.js";
import Wallet from "./model.js";
import Transaction from "../transaction/model.js";
import Notification from "../notification/model.js";
import firebaseAdmin from "../../utils/firebase.js";
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
        console.log(wallet);
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
        const refTrx = await generateTransactionRef();
        const user = await User.findById(new mongoose.Types.ObjectId(userId));
        if (!user)
            throw new NotFoundError(`user not found`);
        await Transaction.create({
            userId: wallet.userId,
            type: "Top Up",
            amount: transactionAmount,
            trx_id: refTrx,
            status: "SUCCESSFUL",
        });
        const notification = new Notification({
            userId: new mongoose.Types.ObjectId(userId),
            title: "CABLE_PURCHASE Successful",
            body: `Transaction successful for top up  ${transactionAmount} .`,
            data: {
                transactionAmount,
                phone: user?.phoneNumber,
                status: "SUCCESSFUL",
            },
        });
        await notification.save();
        // ✅ Send push notification via Firebase
        if (user.deviceToken) {
            await firebaseAdmin.messaging().send({
                token: user.deviceToken,
                notification: {
                    title: "WALLET TOP UP Successful",
                    body: `You have successfully purchased data of ${transactionAmount} for ${user?.phoneNumber}.`,
                },
                data: {
                    amount: transactionAmount.toString(),
                    phone: user?.phoneNumber,
                    status: "SUCCESSFUL",
                },
            });
        }
        console.log("Updated Wallet:", updatedWallet);
    }
    else {
        console.error("Transaction verification failed:", transaction);
        throw new BadRequestError("Transaction verification failed");
    }
};
