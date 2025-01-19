import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../utils/error.js";
import Transaction from "./model.js";
import User from "../user/model.js";
export const listTrx = async (userId) => {
    const trxs = await Transaction.find({ userId: userId }).sort({
        createdAt: -1,
    });
    return {
        status: true,
        message: `Fetched successfully`,
        data: trxs,
    };
};
export const listOne = async (transactionId, userId) => {
    const trx = await Transaction.findOne({ _id: transactionId, userId: userId });
    if (!trx)
        throw new NotFoundError(`Transaction not found`);
    return {
        status: true,
        message: `Fetched successfully`,
        data: trx,
    };
};
export const getYearlyTransactionSummary = async (userId, year) => {
    try {
        // Validate if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestError("Invalid userId format");
        }
        // Use provided year or default to current year
        const targetYear = year || new Date().getFullYear();
        const startDate = new Date(targetYear, 0, 1); // January 1st
        const endDate = new Date(targetYear, 11, 31, 23, 59, 59);
        const userInfo = await User.findById(userId);
        if (!userInfo) {
            throw new NotFoundError("user noy found");
        }
        const summary = await Transaction.aggregate([
            {
                $match: {
                    userId: userInfo._id,
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    totalAmount: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.month": 1 },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    totalAmount: 1,
                    totalTransactions: 1,
                    monthName: {
                        $let: {
                            vars: {
                                monthsArray: [
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ],
                            },
                            in: {
                                $arrayElemAt: [
                                    "$$monthsArray",
                                    { $subtract: ["$_id.month", 1] },
                                ],
                            },
                        },
                    },
                },
            },
        ]);
        // Fill in missing months with zero values
        const completeMonthly = Array.from({ length: 12 }, (_, index) => {
            const existingMonth = summary.find((item) => item.month === index + 1);
            if (existingMonth)
                return existingMonth;
            return {
                month: index + 1,
                year: targetYear,
                monthName: new Date(targetYear, index).toLocaleString("default", {
                    month: "long",
                }),
                totalAmount: 0,
                totalTransactions: 0,
            };
        });
        // Calculate yearly totals
        const yearlyTotal = completeMonthly.reduce((acc, month) => ({
            totalAmount: acc.totalAmount + month.totalAmount,
            totalTransactions: acc.totalTransactions + month.totalTransactions,
        }), { totalAmount: 0, totalTransactions: 0 });
        return {
            status: true,
            message: `Transaction summary for ${targetYear}`,
            data: {
                year: targetYear,
                monthly: completeMonthly,
                yearlyTotal,
            },
        };
    }
    catch (error) {
        console.error("Error fetching yearly transaction summary:", error);
        throw new BadRequestError("Unable to fetch yearly transaction summary. Ensure your inputs are valid.");
    }
};
