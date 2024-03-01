/* ----------------- 액션 타입 ------------------ */
export const ADD_TRANSACTION = "transactions/ADD_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";

/* ----------------- 액션 생성 함수 ------------------ */
export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const editTransaction = (transaction) => ({
  type: EDIT_TRANSACTION,
  payload: transaction,
});

export const removeTransaction = (id) => ({
  type: REMOVE_TRANSACTION,
  payload: id,
});

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  transactions: [],
};

/* ----------------- 리듀서 ------------------ */
const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
    case REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    default:
      return state;
  }
};

export default transactionReducer;
