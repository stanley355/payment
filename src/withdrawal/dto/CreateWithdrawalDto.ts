export interface CreateWithdrawalDto {
  balanceID: string;
  userID: string;
  bankName: 'BCA' | 'GO_PAY';
  accountNumber: string;
  accountOwnerName: string;
  amount: number;
  message?: string;
}