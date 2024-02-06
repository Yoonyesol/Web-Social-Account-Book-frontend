import { combineReducers } from "redux";
import userReducer from "./user";
import transactionReducer from "./transactions";

const rootReducer = combineReducers({ user: userReducer, transactions: transactionReducer });

export default rootReducer;
