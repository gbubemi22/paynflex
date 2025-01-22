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
    };
    token: string;
}>;
