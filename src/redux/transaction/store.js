import { createStore } from "redux";
import transactionReducer from "./reducers";

const store = createStore(transactionReducer);

export default store;
