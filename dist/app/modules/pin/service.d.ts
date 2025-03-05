export declare const create: (userId: string, pin: string) => Promise<{
    success: boolean;
    message: string;
    data: {};
}>;
export declare const verifyPin: (userId: string, pin: string) => Promise<{
    success: boolean;
    message: string;
    data: {};
}>;
export declare const initiateResetPin: (identifier: string, method: "email" | "phoneNumber") => Promise<{
    success: boolean;
    message: string;
    data: {};
}>;
export declare const verifyPinRest: (identifier: string, otp: string, pin: string) => Promise<{
    success: boolean;
    message: string;
}>;
