
export interface UpdateWithdrawalDto {
  withdrawalID: string;
  status: 'SUCCESS' | "REJECTED",
  message?: string;
}