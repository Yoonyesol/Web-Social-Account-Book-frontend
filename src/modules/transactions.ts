import { TransactionData, TransactionList } from "../interfaces/TransactionData";

/* ----------------- 액션 타입 ------------------ */
export const GET = "transactions/GET" as const;
export const ADD = "transactions/ADD" as const;
export const EDIT = "transactions/EDIT" as const;
export const REMOVE = "transactions/REMOVE" as const;

/* ----------------- 액션 생성 함수 ------------------ */
export const getTransactions = (transactions: TransactionData[]) => ({
  type: GET,
  payload: transactions,
});

export const addTransaction = (transaction: TransactionData) => ({
  type: ADD,
  payload: transaction,
});

export const editTransaction = (transaction: TransactionData) => ({
  type: EDIT,
  payload: transaction,
});

export const removeTransaction = (id: string) => ({
  type: REMOVE,
  payload: id,
});

type TransactionsAction =
  | ReturnType<typeof getTransactions>
  | ReturnType<typeof addTransaction>
  | ReturnType<typeof editTransaction>
  | ReturnType<typeof removeTransaction>;

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState: TransactionList = {
  transactions: [],
};

/* ----------------- 리듀서 ------------------ */
const transactionReducer = (state: TransactionList = initialState, action: TransactionsAction): TransactionList => {
  switch (action.type) {
    case GET:
      return {
        transactions: action.payload, // 새로운 데이터로 업데이트
      };
    case ADD:
      return {
        transactions: [...state.transactions, action.payload],
      };
    case EDIT:
      return {
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
    case REMOVE:
      return {
        transactions: state.transactions.filter((transaction) => transaction._id !== action.payload),
      };
    default:
      return state;
  }
};

export default transactionReducer;
