/* ----------------- 액션 타입 ------------------ */
export const ADD = "transactions/ADD";
export const EDIT = "transactions/EDIT";
export const REMOVE = "transactions/REMOVE";

/* ----------------- 액션 생성 함수 ------------------ */
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
    case ADD:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case EDIT:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
    case REMOVE:
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export default transactionReducer;
