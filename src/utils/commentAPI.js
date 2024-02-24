import axios from "axios";

export const fetchAllCommentsByPostIdAPI = async (cid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/comment/${cid}`);
    return responseData.data.comments;
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

export const fetchAllCommentsByUserIdAPI = async (uid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/comment/user/${uid}`);
    return responseData.data.comments;
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

export const createCommentAPI = async (form, token) => {
  try {
    const newData = {
      postId: form.postId,
      authorId: form.authorId,
      authorName: form.authorName,
      content: form.content,
    };

    const responseData = await axios.post("http://localhost:5000/api/comment", newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseData.data.comment;
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
