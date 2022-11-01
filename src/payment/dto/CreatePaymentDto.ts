export interface CreatePaymentDto {
  channelID: number;
  channelName: string;
  subscriberID: string;
  subscriberName: string;
  subscriptionDuration: number;
  totalAmount: number;
}