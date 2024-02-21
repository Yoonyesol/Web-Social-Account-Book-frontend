// utils/api.js
import axios from "axios";

export const fetchTransactionByTidAPI = async (tid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/transactions/${tid}`);
    return responseData.data.transaction;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchTransactionsByUidAPI = async (uid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/transactions/user/${uid}`);
    return responseData.data.transactions;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const postTransactionAPI = async (form, token) => {
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
    const responseData = await axios.post("http://localhost:5000/api/transactions", newData, {
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

export const editTransactionAPI = async (editedData, token) => {
  try {
    const newData = {
      date: new Date(editedData.date).getTime(),
      transaction_type: editedData.transaction_type,
      category: editedData.category,
      title: editedData.title,
      amount: editedData.amount,
      memo: editedData.memo,
    };
    const responseData = await axios.patch(`http://localhost:5000/api/transactions/${editedData.id}`, newData, {
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

export const deleteTransactionAPI = async (tid, token) => {
  try {
    await axios.delete(`http://localhost:5000/api/transactions/${tid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const fetchMonthlyTransactions = async (uid, date) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/transactions/${uid}/${date}`);
    return responseData.data;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
