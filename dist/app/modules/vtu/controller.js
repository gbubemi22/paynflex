import { StatusCodes } from "http-status-codes";
import { balance, purchaseAirtime, purchaseCableSub, purchaseData, purchaseElectricity, verifyCableSub, } from "./service.js";
export const Balance = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await balance());
    }
    catch (error) {
        next(error);
    }
};
export const PurchaseAirtime = async (req, res, next) => {
    try {
        const userId = req.user;
        const { phone, networkId, amount } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await purchaseAirtime(userId, phone, networkId, amount));
    }
    catch (error) {
        next(error);
    }
};
export const PurchaseData = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { phone, networkId, amount, variation_id } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await purchaseData(userId, phone, networkId, amount, variation_id));
    }
    catch (error) {
        next(error);
    }
};
export const VerifyCableSub = async (req, res, next) => {
    try {
        const { service_id, customer_id, variation_id } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await verifyCableSub(service_id, customer_id, variation_id));
    }
    catch (error) {
        next(error);
    }
};
export const PurchaseCableSub = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { phone, service_id, smartcard_number, variation_id, amount } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await purchaseCableSub(userId, phone, amount, service_id, smartcard_number, variation_id));
    }
    catch (error) {
        next(error);
    }
};
export const PurchaseElectricity = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { phone, service_id, meter_number, variation_id, amount } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await purchaseElectricity(userId, phone, meter_number, service_id, variation_id, amount));
    }
    catch (error) {
        next(error);
    }
};
