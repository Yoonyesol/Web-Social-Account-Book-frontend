// utils/api.js
import axios from "axios";
import { TransactionData } from "../interfaces/TransactionData";

export const fetchTransactionByTidAPI = async (tid: string) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/transactions/${tid}`);
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchTransactionsByUidAPI = async (uid: string) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/transactions/user/${uid}`);
    return responseData.data.transactions;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const postTransactionAPI = async (form: TransactionData, token: string) => {
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
    const responseData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/transactions`, newData, {
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

export const editTransactionAPI = async (editedData: TransactionData, token: string) => {
  try {
    const newData = {
      date: new Date(editedData.date).getTime(),
      transaction_type: editedData.transaction_type,
      category: editedData.category,
      title: editedData.title,
      amount: editedData.amount,
      memo: editedData.memo,
    };
    const responseData = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}api/transactions/${editedData.id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const deleteTransactionAPI = async (tid: string, token: string) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/transactions/${tid}`, {
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
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/transactions/${uid}/${date}`);
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchLatestExpensesAPI = async (uid: string) => {
  try {
    const responseData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/transactions/user/latestExpenses/${uid}`,
    );
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchExpensesCategoryAPI = async (uid: string) => {
  try {
    const responseData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/transactions/user/${uid}/expense/category/top5`,
    );
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
