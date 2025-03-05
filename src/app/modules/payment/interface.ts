export type CreatePayStackPaymentDto = {
  amount: number;
  email: string;
  reference: string;
  callback_url?: string;
};
