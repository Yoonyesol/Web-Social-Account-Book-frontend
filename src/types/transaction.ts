/* ----------------- 가계부 ------------------ */
export interface TransactionList {
  transactions: TransactionEntity[];
}

export interface TransactionEntity {
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

/* ----------------- 가계부 분석 ------------------ */
export interface TransactionAnalyticsEntity {
  budget: BudgetType;
  expense: number;
  income: number;
}

export interface BudgetType {
  monthYear: string;
  amount: number;
}

export interface BudgetFormType extends BudgetType {
  uid: string;
  id: string;
}
