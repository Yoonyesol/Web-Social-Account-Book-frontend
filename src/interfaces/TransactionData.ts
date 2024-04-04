export interface TransactionList {
  transactions: TransactionData[];
}

export interface TransactionData {
  uid: string;
  transaction_type: boolean;
  date: number;
  category: string;
  title: string;
  amount: number;
  memo: string;
}
