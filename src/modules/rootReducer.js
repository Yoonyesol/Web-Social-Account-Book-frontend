import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import transactionReducer from "./transactions";
import transactionAnalyticsReducer from "./transactionAnalytics";

const persistConfig = {
  key: "root",
  whitelist: ["user"],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionReducer,
  transactionAnalytics: transactionAnalyticsReducer,
});

export default persistReducer(persistConfig, rootReducer);
