import axios from "axios";

export const fetchUserDataAPI = async () => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/users`);
    return responseData.data.users;
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const signupAPI = async (form) => {
  try {
    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    await axios.post(`http://localhost:5000/api/users/signup`, user);
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};

export const loginAPI = async (form) => {
  try {
    const user = {
      email: form.email,
      password: form.password,
    };
    await axios.post(`http://localhost:5000/api/users/login`, user);
  } catch (e) {
    console.log("HTTP request 도중 에러 발생:", e.message);
    throw e;
  }
};
