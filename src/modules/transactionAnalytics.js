/* ----------------- 액션 타입 ------------------ */
export const SET_BUDGET = "transactions/SET_BUDGET";
export const SET_INCOME = "transactions/SET_INCOME";
export const SET_EXPENSE = "transactions/SET_EXPENSE";
export const CLEAR_TRANSACTIONS_DATA = "transactions/CLEAR_TRANSACTIONS_DATA";

/* ----------------- 액션 생성 함수 ------------------ */
export const setBudget = (budget) => ({
  type: SET_BUDGET,
  payload: budget,
});

export const setIncome = (income) => ({
  type: SET_INCOME,
  payload: income,
});

export const setExpense = (expense) => ({
  type: SET_EXPENSE,
  payload: expense,
});

export const clearTransactionsData = () => ({
  type: CLEAR_TRANSACTIONS_DATA,
});

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  budget: { amount: 0 },
  income: 0,
  expense: 0,
};

/* ----------------- 리듀서 ------------------ */
const transactionAnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUDGET:
      return {
        ...state,
        budget: action.payload,
      };
    case SET_INCOME:
      return {
        ...state,
        income: action.payload,
      };
    case SET_EXPENSE:
      return {
        ...state,
        expense: action.payload,
      };
    default:
      return state;
  }
};

export default transactionAnalyticsReducer;
