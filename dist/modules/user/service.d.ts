import { UserDataType } from "./type.js";
export declare const create: (payload: UserDataType) => Promise<{
    success: boolean;
    message: string;
    data: {
        id: unknown;
        email: string;
        phoneNumber: string;
        referralCode: string | undefined;
    };
}>;
export declare const sendVerificationOtpToPhone: (phoneNumber: string) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const verifyOtpVerification: (phoneNumber: string, otp: string) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const login: (phoneNumber: string, email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    user: {
        id: unknown;
        email: string;
        phoneNumber: string;
        referralCode: string | undefined;
    };
    token: string;
}>;
export declare const requestPasswordReset: (identifier: string, method: "email" | "phoneNumber") => Promise<{
    success: boolean;
    message: string;
}>;
export declare const verifyOtpForPasswordReset: (identifier: string, otp: string, password: string) => Promise<{
    success: boolean;
    message: string;
    data: never[];
}>;
export declare const getProfile: (userId: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        email: string;
        password: string;
        phoneNumber: string;
        firstName?: string;
        lastName?: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        referralCode?: string;
        block: boolean;
        kycStatus: boolean;
        lastLoginDevice: {
            userAgent: String;
            appVersion: String;
            platform: String;
            platformVersion: String;
            device: String;
            notificationToken: String;
            expoPushNotificationToken: String;
            devicePushNotificationToken: String;
        };
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }>>;
}>;
export declare const updateUserProfile: (userId: string, firstName?: string, lastName?: string, phoneNumber?: string, email?: string) => Promise<{
    success: boolean;
    message: string;
    data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, any, any> & {
        email: string;
        password: string;
        phoneNumber: string;
        firstName?: string;
        lastName?: string;
        otp: string;
        expired_at: Date;
        verifiedEmail: boolean;
        verifiedPhoneNumber: boolean;
        referralCode?: string;
        block: boolean;
        kycStatus: boolean;
        lastLoginDevice: {
            userAgent: String;
            appVersion: String;
            platform: String;
            platformVersion: String;
            device: String;
            notificationToken: String;
            expoPushNotificationToken: String;
            devicePushNotificationToken: String;
        };
        comparePassword(candidatePassword: string): Promise<boolean>;
        generateJWT(): Promise<string>;
    } & Required<{
        _id: unknown;
    }>>;
}>;
