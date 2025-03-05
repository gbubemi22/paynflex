import { CategoryDocument } from "./model.js";
export declare const create: (payload: CategoryDocument) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const listAll: () => Promise<{
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, CategoryDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, CategoryDocument> & import("mongoose").Document<unknown, any, any> & {
        name: string;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const update: (id: string, name: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        name: string;
    } & Required<{
        _id: unknown;
    }>> | undefined;
}>;
export declare const remove: (id: string) => Promise<{
    success: boolean;
    message: string;
    data: null;
}>;
