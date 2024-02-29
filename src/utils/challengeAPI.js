import axios from "axios";

export const fetchBudgetExpenseRatioAPI = async (date) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/challenge/${date}`);
    return responseData.data.challenge;
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
