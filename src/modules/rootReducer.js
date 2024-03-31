import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import transactionReducer from "./transactions";
import transactionAnalyticsReducer from "./transactionAnalytics";
import { encryptTransform } from "redux-persist-transform-encrypt";

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

const reducer = persistReducer(
  {
    ...persistConfig,
    transforms: [
      encryptTransform({
        secretKey: process.env.REACT_APP_PERSISTOR_SECRET_KEY,
      }),
    ],
  },
  rootReducer,
);

export default reducer;
