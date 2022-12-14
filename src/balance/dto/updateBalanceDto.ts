export interface UpdateBalanceDto {
  id?: string;
  userID?: string;
  userName?: string;
  userEmail?: string;
  channelID?: number;
  channelName?: string;
  amount?: number;
  bankName?: string;
  bankAccount?: string;
  accountHolderName?: string;
}