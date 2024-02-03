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

export const postTransactionAPI = async (form) => {
  try {
    const newData = {
      uid: "u1",
      date: new Date(form.date).getTime(),
      transaction_type: form.transaction_type,
      category: form.category,
      title: form.title,
      amount: form.amount,
      memo: form.memo,
    };
    await axios.post("http://localhost:5000/api/transactions", newData);
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const editTransactionAPI = async (editedData) => {
  try {
    const newData = {
      date: new Date(editedData.date).getTime(),
      transaction_type: editedData.transaction_type,
      category: editedData.category,
      title: editedData.title,
      amount: editedData.amount,
      memo: editedData.memo,
    };
    await axios.patch(`http://localhost:5000/api/transactions/${editedData.id}`, newData);
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const deleteTransactionAPI = async (tid) => {
  try {
    await axios.delete(`http://localhost:5000/api/transactions/${tid}`);
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
