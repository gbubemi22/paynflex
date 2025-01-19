import { BadRequestError } from "../../utils/error.js";
import axios from "axios";
import Wallet from "../wallet/model.js";
import mongoose from "mongoose";
import Transaction from "../transaction/model.js";
import { generateTransactionRef } from "../../utils/constant.js";
const vtuUrl = process.env.VTU_URL;
const password = process.env.VTU_PASSWORD;
const username = process.env.VTU_USERNAME;
export const balance = async () => {
    try {
        const params = new URLSearchParams({
            username: username,
            password: password,
        });
        // Construct the URL correctly, ensuring no double slashes
        const url = `${vtuUrl.replace(/\/+$/, "")}/balance?${params.toString()}`;
        // Perform the GET request
        const response = await axios.get(url);
        console.log(" Only:", response.data.message.data.balance);
        console.log(" Data:", response.data);
        if (response.data.code === "success") {
            return response.data;
        }
        else {
            throw new BadRequestError(response.data || "Failed to fetch wallet balance");
        }
    }
    catch (error) {
        console.error("Error fetching wallet balance:", error.data);
        throw new BadRequestError("Unable to retrieve wallet balance at this time.");
    }
};
export const purchaseAirtime = async (userId, phone, networkId, amount) => {
    const params = new URLSearchParams({
        username: username,
        password: password,
        phone,
        network_id: networkId.toLowerCase(),
        amount: amount.toString(),
    });
    const wallet = await Wallet.findOne({
        userId: new mongoose.Types.ObjectId(userId),
    });
    const airtimeAmount = Number(amount);
    if (!wallet) {
        throw new BadRequestError("Wallet not found for the user.");
    }
    // Check if the wallet balance is sufficient
    if (wallet.balance < airtimeAmount) {
        throw new BadRequestError("Insufficient wallet balance. Please top up your wallet.");
    }
    const url = "https://vtu.ng/wp-json/api/v1/airtime";
    const response = await axios.get(url, { params });
    console.log("CODE", response.data.message);
    console.log("CODE", response.data.code);
    if (response.data.code === "failure") {
        throw new BadRequestError(`DUPLICATE ORDER. Please wait for 3 minutes before placing another airtime order of the same amount to the same phone number.`);
    }
    const reference = await generateTransactionRef();
    // Handle both success and processing states
    if (response.data.code === "processing" || response.data.code === "success") {
        // Deduct from wallet
        await Wallet.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, { $inc: { balance: -Number(amount) } }, { new: true });
        await Transaction.create({
            userId: wallet.userId,
            type: "AIRTIME_PURCHASE",
            amount: airtimeAmount,
            trx_id: reference,
        });
        return {
            message: "Airtime purchase successful",
            data: {},
        };
    }
    else {
        throw new BadRequestError(response.data.message || "Airtime purchase failed");
    }
};
export const purchaseData = async (userId, phone, networkId, amount, variation_id) => {
    const wallet = await Wallet.findOne({
        userId: new mongoose.Types.ObjectId(userId),
    });
    const airtimeAmount = Number(amount);
    if (!wallet) {
        throw new BadRequestError("Wallet not found for the user.");
    }
    const reference = await generateTransactionRef();
    // Check if the wallet balance is sufficient
    if (wallet.balance < airtimeAmount) {
        throw new BadRequestError("Insufficient wallet balance. Please top up your wallet.");
    }
    const params = new URLSearchParams({
        username: username,
        password: password,
        phone,
        network_id: networkId.toLowerCase(),
        amount: amount.toString(),
        variation_id: variation_id.toString(),
    });
    const url = "https://vtu.ng/wp-json/api/v1/data";
    const response = await axios.get(url, { params });
    if (response.data.code === "failure") {
        throw new BadRequestError(`DUPLICATE ORDER. Please wait for 3 minutes before placing another Data order of the same amount to the same phone number.`);
    }
    // Handle both success and processing states
    if (response.data.code === "processing" || response.data.code === "success") {
        // Deduct from wallet
        await Wallet.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, { $inc: { balance: -Number(amount) } }, { new: true });
        await Transaction.create({
            userId: wallet.userId,
            type: "DATA_PURCHASE",
            amount: airtimeAmount,
            trx_id: reference,
        });
        return {
            message: "Airtime purchase successful",
            data: {},
        };
    }
    else {
        throw new BadRequestError(response.data.message || "Data purchase failed");
    }
};
export const verifyCableSub = async (service_id, customer_id, variation_id) => {
    const params = new URLSearchParams({
        username: username,
        password: password,
        service_id: service_id.toLowerCase(),
        ...(customer_id && { customer_id: customer_id }),
        ...(variation_id && { variation_id: variation_id.toString() }),
    });
    const url = "https://vtu.ng/wp-json/api/v1/verify-customer";
    console.log(url);
    const response = await axios.get(url, { params });
    console.log("CODE", response.data.message);
    console.log("CODE", response.data.code);
    if (response.data.code === "failure") {
        throw new BadRequestError(`Invalid Meter Number or Card number`);
    }
    // Handle both success and processing states
    if (response.data.code === "success" || response.data.code === "processing") {
        return {
            message: "Customer details successfully retrieved",
            data: response.data,
        };
    }
    else {
        throw new BadRequestError(response.data.message || "Verification failed");
    }
};
export const purchaseCableSub = async (userId, phone, amount, service_id, customer_id, variation_id) => {
    const params = new URLSearchParams({
        username: username,
        password: password,
        phone,
        service_id: service_id.toLowerCase(),
        ...(customer_id && { customer_id: customer_id }),
        ...(variation_id && { variation_id: variation_id.toString() }),
    });
    const wallet = await Wallet.findOne({
        userId: new mongoose.Types.ObjectId(userId),
    });
    const airtimeAmount = Number(amount);
    if (!wallet) {
        throw new BadRequestError("Wallet not found for the user.");
    }
    // Check if the wallet balance is sufficient
    if (wallet.balance < airtimeAmount) {
        throw new BadRequestError("Insufficient wallet balance. Please top up your wallet.");
    }
    const reference = await generateTransactionRef();
    const url = "https://vtu.ng/wp-json/api/v1/tv";
    const response = await axios.get(url, { params });
    if (response.data.code === "failure") {
        throw new BadRequestError(`Invalid Meter Number`);
    }
    // Handle both success and processing states
    if (response.data.code === "processing" || response.data.code === "success") {
        // Deduct from wallet
        await Wallet.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, { $inc: { balance: -Number(amount) } }, { new: true });
        await Transaction.create({
            userId: wallet.userId,
            type: "CABLE_PURCHASE",
            amount: airtimeAmount,
            trx_id: reference,
        });
        return {
            message: "Electricity bill successfully paid",
            data: response.data,
        };
    }
    else {
        throw new BadRequestError(response.data.message || "Electricity bill purchase failed");
    }
};
export const purchaseElectricity = async (userId, phone, meter_number, service_id, variation_id, amount) => {
    const params = new URLSearchParams({
        username: username,
        password: password,
        phone,
        meter_number,
        service_id: service_id.toLowerCase(),
        variation_id,
        amount: amount.toString(),
    });
    const wallet = await Wallet.findOne({
        userId: new mongoose.Types.ObjectId(userId),
    });
    const airtimeAmount = Number(amount);
    if (!wallet) {
        throw new BadRequestError("Wallet not found for the user.");
    }
    // Check if the wallet balance is sufficient
    if (wallet.balance < airtimeAmount) {
        throw new BadRequestError("Insufficient wallet balance. Please top up your wallet.");
    }
    const reference = await generateTransactionRef();
    const url = "https://vtu.ng/wp-json/api/v1/electricity";
    const response = await axios.get(url, { params });
    if (response.data.code === "failure") {
        throw new BadRequestError(`Invalid Meter Number`);
    }
    // Handle both success and processing states
    if (response.data.code === "processing" || response.data.code === "success") {
        // Deduct from wallet
        await Wallet.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, { $inc: { balance: -Number(amount) } }, { new: true });
        await Transaction.create({
            userId: wallet.userId,
            type: "ELECTRICITY_PURCHASE",
            amount: airtimeAmount,
            trx_id: reference,
        });
        return {
            message: "Electricity bill successfully paid",
            data: response.data,
        };
    }
    else {
        throw new BadRequestError(response.data.message || " purchase failed");
    }
};
