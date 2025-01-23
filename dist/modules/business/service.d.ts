import { BusDataType } from "./model.js";
export declare const create: (payload: BusDataType) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: string;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const list: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").BusinessDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: string;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").BusinessDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: string;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
