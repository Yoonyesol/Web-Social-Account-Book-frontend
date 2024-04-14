import axios from "axios";
import { CommentFormType } from "../components/Community/CommentEditor";

export const fetchAllCommentsByPostIdAPI = async (cid: string) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/comment/${cid}`);
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

export const fetchAllCommentsByUserIdAPI = async (uid: string) => {
  try {
    const responseData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/comment/user/${uid}`);
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

export const createCommentAPI = async (form: CommentFormType, token: string) => {
  try {
    const newData = {
      postId: form.postId,
      authorId: form.authorId,
      authorName: form.authorName,
      content: form.content,
    };

    const responseData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/comment`, newData, {
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

export const updateCommentAPI = async (id: string, content: string, token: string) => {
  try {
    const editedData = {
      content: content,
    };
    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/comment/${id}`, editedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const deleteCommentAPI = async (id: string, token: string) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
