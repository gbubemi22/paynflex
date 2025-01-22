import Transaction from "../transaction/model.js";
import User from "../user/model.js";

export const user = async () => {
  const totalUsers = await User.countDocuments({});

  const totalSuspendedUsers = await User.countDocuments({ block: true });

  const totalPendingUsers = await User.countDocuments({ kycStatus: false });

  return {
    totalUsers: totalUsers,
    totalSuspendedUsers: totalSuspendedUsers,
    totalPendingUsers: totalPendingUsers,
  };
};

export const trx = async () => {
  // Calculate total amount of all transactions
  const totalTrxAmount = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  // Calculate total amount of pending transactions
  const totalPendingAmount = await Transaction.aggregate([
    {
      $match: { status: "PENDING" }, // Filter for pending transactions
    },
    {
      $group: {
        _id: null,
        totalPendingAmount: { $sum: "$amount" },
      },
    },
  ]);

  const totalFailedAmount = await Transaction.aggregate([
    {
      $match: { status: "FAILED" },
    },
    {
      $group: {
        _id: null,
        totalPendingAmount: { $sum: "$amount" },
      },
    },
  ]);

  // Extracting the total amounts
  const totalAmount =
    totalTrxAmount.length > 0 ? totalTrxAmount[0].totalAmount : 0;
  const pendingAmount =
    totalPendingAmount.length > 0
      ? totalPendingAmount[0].totalPendingAmount
      : 0;

  const failedAmount =
    totalFailedAmount.length > 0 ? totalFailedAmount[0].totalFailedAmount : 0;

  return {
    totalAmount,
    pendingAmount,
    failedAmount,
  };
};

export const getTransactionTotals = async () => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    ); // Start of the week
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Daily total
    const dailyTotal = await Transaction.aggregate([
      {
        $match: {
          data: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Weekly total
    const weeklyTotal = await Transaction.aggregate([
      {
        $match: {
          data: {
            $gte: startOfWeek,
            $lt: new Date(startOfWeek.setDate(startOfWeek.getDate() + 7)),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Monthly total
    const monthlyTotal = await Transaction.aggregate([
      {
        $match: {
          data: {
            $gte: startOfMonth,
            $lt: new Date(
              new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1)
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Extracting the total amounts
    const dailyAmount = dailyTotal.length > 0 ? dailyTotal[0].totalAmount : 0;
    const weeklyAmount =
      weeklyTotal.length > 0 ? weeklyTotal[0].totalAmount : 0;
    const monthlyAmount =
      monthlyTotal.length > 0 ? monthlyTotal[0].totalAmount : 0;

    return {
      dailyAmount,
      weeklyAmount,
      monthlyAmount,
    };
  } catch (error) {
    console.error("Error calculating transaction totals:", error);
    throw error;
  }
};
