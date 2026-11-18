// utils/transactionAPI.ts
import apiClient from "./axiosInstance";
import { TransactionEntity } from "../types";

export const fetchTransactionByTidAPI = async (tid: string) => {
  try {
    const responseData = await apiClient.get(`api/transactions/${tid}`);
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchTransactionsByUidAPI = async (uid: string) => {
  try {
    const responseData = await apiClient.get(`api/transactions/user/${uid}`);
    return responseData.data.transactions;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const postTransactionAPI = async (form: TransactionEntity, token: string) => {
  try {
    const newData = {
      uid: form.uid,
      date: new Date(form.date).getTime(),
      transaction_type: form.transaction_type,
      category: form.category,
      title: form.title,
      amount: form.amount,
      memo: form.memo,
    };
    const responseData = await apiClient.post(`api/transactions`, newData, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
      },
    });
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const editTransactionAPI = async (editedData: TransactionEntity, token: string) => {
  try {
    const newData = {
      date: new Date(editedData.date).getTime(),
      transaction_type: editedData.transaction_type,
      category: editedData.category,
      title: editedData.title,
      amount: editedData.amount,
      memo: editedData.memo,
    };
    const responseData = await apiClient.patch(`api/transactions/${editedData.id}`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const deleteTransactionAPI = async (tid: string, token: string) => {
  try {
    await apiClient.delete(`api/transactions/${tid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchMonthlyTransactionsAPI = async (uid: string, date: string) => {
  try {
    const responseData = await apiClient.get(`api/transactions/${uid}/${date}`);
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchLatestExpensesAPI = async (uid: string) => {
  try {
    const responseData = await apiClient.get(`api/transactions/user/latestExpenses/${uid}`);
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchExpensesCategoryAPI = async (uid: string) => {
  try {
    const responseData = await apiClient.get(`api/transactions/user/${uid}/expense/category/top5`);
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
