import { BusDataType } from "./model.js";
export declare const create: (payload: BusDataType) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: import("mongoose").Types.ObjectId;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const list: (page?: number, limit?: number) => Promise<{
    success: boolean;
    currentPage: number;
    totalPages: number;
    count: number;
    totalCount: number;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").BusinessDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: import("mongoose").Types.ObjectId;
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
        category: import("mongoose").Types.ObjectId;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const update: (id: string, payload: Partial<BusDataType>) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: import("mongoose").Types.ObjectId;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }>> | undefined;
}>;
export declare const updateImage: (id: string, images: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
        description: string;
        address: string;
        category: import("mongoose").Types.ObjectId;
        images: string;
        deleteAt?: Date;
    } & Required<{
        _id: unknown;
    }>> | undefined;
}>;
export declare const remove: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: null;
}>;
