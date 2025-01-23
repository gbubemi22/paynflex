import { DefaultResponseInt } from "../../utils/constant.js";
import { AdminDatatype } from "./model.js";
export declare const create: (payload: AdminDatatype) => Promise<{
    success: boolean;
    message: string;
    data: {
        id: unknown;
        email: string;
        firstName: string;
        lastName: string;
    };
}>;
export declare const login: (email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    user: {
        id: unknown;
        email: string;
        firstName: string;
        lastName: string;
    };
    token: string;
}>;
export declare const getAdminByID: (adminId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").Document<unknown, {}, import("./model.js").AdminDocument> & import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        roleId: import("mongoose").Types.ObjectId;
        verifiedEmail: boolean;
        verifiedNumber: boolean;
        block: boolean;
        otp?: string;
        expired_at?: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const getAllAdminService: () => Promise<{
    count: number;
    success: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, import("./model.js").AdminDocument> & import("mongoose").Document<unknown, any, any> & {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        roleId: import("mongoose").Types.ObjectId;
        verifiedEmail: boolean;
        verifiedNumber: boolean;
        block: boolean;
        otp?: string;
        expired_at?: string;
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
}>;
export declare const forgetPasswordService: (email: string) => Promise<{
    success: boolean;
    message: string;
    data: never[];
}>;
export declare const resetPasswordService: (email: string, password: string, otp: string) => Promise<DefaultResponseInt>;
export declare const changePasswordService: (adminId: string, currentPassword: string, newPassword: string) => Promise<{
    status: boolean;
    message: string;
    data: never[];
}>;
