export declare const sendPushNotification: (token: string, title: string, body: string, data?: any) => Promise<void>;
export declare const listOne: (id: string, userId: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").NotificationDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Schema.Types.ObjectId;
        adminId: import("mongoose").Schema.Types.ObjectId;
        title: string;
        body: string;
        data?: any;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const list: (userId: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").NotificationDocument> & import("mongoose").Document<unknown, any, any> & {
        userId: import("mongoose").Schema.Types.ObjectId;
        adminId: import("mongoose").Schema.Types.ObjectId;
        title: string;
        body: string;
        data?: any;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
