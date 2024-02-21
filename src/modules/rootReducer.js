import { combineReducers } from "redux";
import userReducer from "./user";
import transactionReducer from "./transactions";
import transactionAnalyticsReducer from "./transactionAnalytics";

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionReducer,
  transactionAnalytics: transactionAnalyticsReducer,
});

export default rootReducer;
