export interface UpdatePaidPaymentDto {
  paymentID: string;
  merchantOrderID?: string;
  merchantPaymentLink?: string;
}