export declare const user: () => Promise<{
    totalUsers: number;
    totalSuspendedUsers: number;
    totalPendingUsers: number;
}>;
export declare const trx: () => Promise<{
    totalAmount: any;
    pendingAmount: any;
    failedAmount: any;
    successfulAmount: any;
}>;
export declare const getTransactionTotals: () => Promise<{
    dailyAmount: any;
    weeklyAmount: any;
    monthlyAmount: any;
}>;
