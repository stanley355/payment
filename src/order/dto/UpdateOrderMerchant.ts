export interface IUpdateOrderMerchant {
  orderID: string;
  merchant: "KONTENKU" | "DOKU";
  merchantOrderID?:string;
  merchantPaymentLink?:string;
  merchantVAnumber?: string;
  expiredAt?: string;
}