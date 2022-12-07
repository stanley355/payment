export interface ICreateOrder {
  channelID: number;
  subscriberID: string;
  subscriptionDuration: number;
  amount: number;
}