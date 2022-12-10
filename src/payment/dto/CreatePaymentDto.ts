export interface CreatePaymentDto {
  orderID: string;
  channelID: number;
  totalAmount: number;
}