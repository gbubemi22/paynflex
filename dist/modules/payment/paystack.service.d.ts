import { CreatePayStackPaymentDto } from "./interface.js";
export declare const initializePayment: (paymentData: CreatePayStackPaymentDto) => Promise<any>;
export declare const verifyPayment: (reference: string) => Promise<any>;
