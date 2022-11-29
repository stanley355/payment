export interface CreatePaymentDto {
  channelID: number;
  subscriberID: string;
  subscriptionDuration: number;
  totalAmount: number;
  merchant: 'MIDTRANS' | 'KONTENKU';
  merchantOrderID: string;
  merchantPaymentLink: string;
}