import { PointSettingsData, PointSettingsDto } from "./model.js";
export declare const create: (payload: PointSettingsData) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").PointSettingsDocument> & import("mongoose").Document<unknown, any, any> & {
        point: number;
        value: number;
        threshold: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const list: () => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").PointSettingsDocument> & import("mongoose").Document<unknown, any, any> & {
        point: number;
        value: number;
        threshold: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (id: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").PointSettingsDocument> & import("mongoose").Document<unknown, any, any> & {
        point: number;
        value: number;
        threshold: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const remove: (id: string) => Promise<{
    status: boolean;
    message: string;
    data: never[];
}>;
export declare const update: (id: string, data: PointSettingsDto) => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").PointSettingsDocument> & import("mongoose").Document<unknown, any, any> & {
        point: number;
        value: number;
        threshold: number;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null;
}>;
