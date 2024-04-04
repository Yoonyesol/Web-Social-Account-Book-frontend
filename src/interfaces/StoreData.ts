import { TransactionList } from "./TransactionData";
import { UserData } from "./UserData";

export interface StoreData {
  transactionAnalytics: Object;
  transactions: TransactionList;
  user: UserData;
}
