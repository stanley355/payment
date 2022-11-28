export interface CreatePaymentDto {
  channelID: number;
  subscriberID: string;
  subscriptionDuration: number;
  totalAmount: number;
  merchant: string;
  merchant_order_id: string;
  merchant_payment_link: string;
}