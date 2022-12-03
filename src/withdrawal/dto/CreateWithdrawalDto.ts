export interface CreateWithdrawalDto {
  userID: string;
  bankName: 'BCA' | 'GO_PAY';
  accountNumber: string;
  accountOwnerName: string;
  amount: number;
}