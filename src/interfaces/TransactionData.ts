export interface TransactionList {
  transactions: TransactionData[];
}

export interface TransactionData {
  id?: string;
  _id?: string;
  uid?: string;
  transaction_type: boolean;
  date: number;
  category: string;
  title: string;
  amount: number;
  memo: string;
}

export interface TransactionAnalyticsData {
  budget: BudgetData;
  expense: number;
  income: number;
}

export interface BudgetData {
  monthYear: string;
  amount: number;
}

export interface BudgetFormType extends BudgetData {
  uid: string;
  id: string;
}
