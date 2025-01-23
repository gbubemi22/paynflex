import { ProductDataType } from "./model.js";
export declare const create: (payload: ProductDataType) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
        price: number;
        category: string;
        images: string;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const list: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").ProductDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
        price: number;
        category: string;
        images: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").ProductDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
        price: number;
        category: string;
        images: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
