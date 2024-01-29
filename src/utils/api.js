// utils/api.js
import axios from "axios";

export const fetchTransactionsByUid = async (uid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/transactions/user/${uid}`);
    return responseData.data.transactions;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

export const postTransaction = async (form) => {
  try {
    await axios.post("http://localhost:5000/api/transactions", {
      uid: "u1",
      date: new Date(form.date),
      category: form.category,
      title: form.title,
      amount: form.type === "수입" ? form.amount : form.amount * -1,
      memo: form.memo,
    });
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
