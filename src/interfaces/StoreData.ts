import { TransactionAnalyticsData, TransactionList } from "./TransactionData";
import { UserData } from "./UserData";

export interface StoreData {
  transactionAnalytics: TransactionAnalyticsData;
  transactions: TransactionList;
  user: UserData;
}
