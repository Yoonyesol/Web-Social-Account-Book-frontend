import axios from "axios";
import { AuthFormType, BudgetFormType } from "../types";

export const fetchUserDataAPI = async () => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users`);
    return responseData.data.users;
  } catch (error) {
    if (error.response) {
      // 서버 응답이 도착한 경우
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // 서버로 요청이 도착하지 않은 경우
      throw new Error("서버 응답이 없습니다.");
    } else {
      // 요청을 보내기 전에 예외가 발생한 경우
      throw new Error("요청을 보내는 중에 에러가 발생했습니다.");
    }
  }
};

export const signupAPI = async (form: AuthFormType) => {
  try {
    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    const responseData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/users/signup`, user);
    return responseData.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("서버 응답이 없습니다.");
    } else {
      throw new Error("요청을 보내는 중에 에러가 발생했습니다.");
    }
  }
};

export const loginAPI = async (form: AuthFormType) => {
  try {
    const user = {
      email: form.email,
      password: form.password,
    };
    const responseData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/users/login`, user);
    return responseData.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("서버 응답이 없습니다.");
    } else {
      throw new Error("요청을 보내는 중에 에러가 발생했습니다.");
    }
  }
};

export const fetchBudgetAPI = async (uid: string, date: string) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users/budget/${uid}/${date}`);
    return responseData.data.budget;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("서버 응답이 없습니다.");
    } else {
      throw new Error("요청을 보내는 중에 에러가 발생했습니다.");
    }
  }
};

export const editBudgetAPI = async (editedData: BudgetFormType) => {
  try {
    const newData = {
      monthYear: editedData.monthYear,
      amount: editedData.amount,
    };
    const responseData = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}api/users/budget/${editedData.uid}/${editedData.id}`,
      newData,
    );
    return responseData.data.budget;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
