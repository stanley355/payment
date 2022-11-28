export interface CreatePaymentDto {
  channelID: number;
  subscriberID: string;
  subscriptionDuration: number;
  totalAmount: number;
  merchant: string;
  merchantOrderID: string;
  merchantPaymentLink: string;
}