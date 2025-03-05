import Joi from "joi";
export declare function joiValidator(constraint: any, isMiddleware?: boolean): any;
declare const _default: {
    create: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    logout: {
        params: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    sendVerificationOtpToPhone: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    VerifyOtpVerification: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    requestPasswordReset: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    VerifyOtpForPasswordReset: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    login: {
        schema: Joi.ObjectSchema<any>;
    };
};
export default _default;
