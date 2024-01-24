// actionTypes 정의
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";

// 액션 생성자 함수 정의
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
