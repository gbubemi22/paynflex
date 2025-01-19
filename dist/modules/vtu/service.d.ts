export declare const balance: () => Promise<any>;
export declare const purchaseAirtime: (userId: string, phone: string, networkId: string, amount: string) => Promise<{
    message: string;
    data: {};
}>;
export declare const purchaseData: (userId: string, phone: string, networkId: string, amount: string, variation_id: string) => Promise<{
    message: string;
    data: {};
}>;
export declare const verifyCableSub: (service_id: string, customer_id?: string, variation_id?: string) => Promise<{
    message: string;
    data: any;
}>;
export declare const purchaseCableSub: (userId: string, phone: string, amount: string, service_id: string, customer_id?: string, variation_id?: string) => Promise<{
    message: string;
    data: any;
}>;
export declare const purchaseElectricity: (userId: string, phone: string, meter_number: string, service_id: string, variation_id: string, amount: string) => Promise<{
    message: string;
    data: any;
}>;
