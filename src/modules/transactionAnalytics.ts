import { TransactionAnalyticsEntity } from "../types";

/* ----------------- 액션 타입 ------------------ */
export const SET_BUDGET = "transactions/SET_BUDGET" as const;
export const SET_INCOME = "transactions/SET_INCOME" as const;
export const SET_EXPENSE = "transactions/SET_EXPENSE" as const;
export const CLEAR_TRANSACTIONS_DATA = "transactions/CLEAR_TRANSACTIONS_DATA" as const;

/* ----------------- 액션 생성 함수 ------------------ */
export const setBudget = (budget: { monthYear: string; amount: number }) => ({
  type: SET_BUDGET,
  payload: budget,
});

export const setIncome = (income: number) => ({
  type: SET_INCOME,
  payload: income,
});

export const setExpense = (expense: number) => ({
  type: SET_EXPENSE,
  payload: expense,
});

export const clearTransactionsData = () => ({
  type: CLEAR_TRANSACTIONS_DATA,
});

type TransactionAnalyticsAction =
  | ReturnType<typeof setBudget>
  | ReturnType<typeof setIncome>
  | ReturnType<typeof setExpense>
  | ReturnType<typeof clearTransactionsData>;

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState: TransactionAnalyticsEntity = {
  budget: { monthYear: "", amount: 0 },
  income: 0,
  expense: 0,
};

/* ----------------- 리듀서 ------------------ */
const transactionAnalyticsReducer = (
  state: TransactionAnalyticsEntity = initialState,
  action: TransactionAnalyticsAction,
): TransactionAnalyticsEntity => {
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
