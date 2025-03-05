export declare const point: (userId: string) => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").PointDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Types.ObjectId;
        balance: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null;
}>;
export declare const convertPoint: (userId: string, amount: number) => Promise<{
    success: boolean;
    message: string;
}>;
