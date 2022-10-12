export interface CreateInvoiceDto {
  externalID: string;
  payerEmail: string;
  description: string;
  amount: number;
  forUserID: string;
}