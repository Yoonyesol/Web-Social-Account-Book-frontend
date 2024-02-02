/* ----------------- 액션 타입 ------------------ */
export const GET = "transactions/GET";
export const ADD = "transactions/ADD";
export const EDIT = "transactions/EDIT";
export const REMOVE = "transactions/REMOVE";

/* ----------------- 액션 생성 함수 ------------------ */
export const getTransactions = (transactions) => ({
  type: GET,
  payload: transactions,
});

export const addTransaction = (transaction) => ({
  type: ADD,
  payload: transaction,
});

export const editTransaction = (transaction) => ({
  type: EDIT,
  payload: transaction,
});

export const removeTransaction = (id) => ({
  type: REMOVE,
  payload: id,
});

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  transactions: [],
};

/* ----------------- 리듀서 ------------------ */
const transactionReducer = (state = initialState, action) => {
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
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export default transactionReducer;
