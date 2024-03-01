import { createStore } from "redux";
import transactionReducer from "./transactions/transactions";

const store = createStore(transactionReducer);

export default store;
