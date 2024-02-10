import axios from "axios";

export const fetchAllPostsAPI = async () => {
  try {
    const responseData = await axios.get("http://localhost:5000/api/community");
    return responseData.data.posts;
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

export const fetchPostByCidAPI = async (cid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/community/${cid}`);
    return responseData.data.post;
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

export const fetchPostsByUidAPI = async (uid) => {
  try {
    const responseData = await axios.get(`http://localhost:5000/api/community/${uid}`);
    return responseData.data.posts;
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

export const createPostAPI = async (form) => {
  try {
    const newData = {
      writer: form.writer,
      date: new Date(form.date).getTime(),
      category: form.category,
      content: form.content,
    };
    await axios.post("http://localhost:5000/api/community", newData);
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
