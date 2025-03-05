export declare const create: (type: string, rewardPercentage: number) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        type: string;
        rewardPercentage: number;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const listOneAdminSetting: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").AdminSettingDocument> & import("mongoose").Document<unknown, any, any> & {
        type: string;
        rewardPercentage: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listAllSettings: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").AdminSettingDocument> & import("mongoose").Document<unknown, any, any> & {
        type: string;
        rewardPercentage: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const update: (id: string, rewardPercentage?: number, type?: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        type: string;
        rewardPercentage: number;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const remove: (id: string) => Promise<{
    success: boolean;
    message: string;
}>;
