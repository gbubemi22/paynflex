export declare const documents: (userId: string, documentImage: string[], documentType: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").KycDocument> & import("./model.js").KycDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const listAll: () => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").KycDocument> & import("./model.js").KycDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const listOne: (id: string) => Promise<{
    status: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").KycDocument> & import("./model.js").KycDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
