import apiClient from "./axiosInstance";
import { EditPostFormType, PostFormType } from "../types";

export const fetchAllPostsAPI = async () => {
  try {
    const responseData = await apiClient.get(`api/community`);
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

export const fetchPostByCidAPI = async (cid: string) => {
  try {
    const responseData = await apiClient.get(`api/community/${cid}`);
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

export const fetchPostsByUidAPI = async (uid: string) => {
  try {
    const responseData = await apiClient.get(`api/community/${uid}`);
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

export const fetchLikedPostByUidAPI = async (token: string) => {
  try {
    const responseData = await apiClient.get(`api/users/likedPosts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseData.data.likedPosts;
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

export const fetchSearchedDataAPI = async (option: string, keyword: string) => {
  try {
    const responseData = await apiClient.get(
      `api/community/search/${encodeURIComponent(option)}/${encodeURIComponent(keyword)}`,
    );
    return responseData.data.searchedData;
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

export const createPostAPI = async (form: PostFormType, token: string) => {
  try {
    const newData = {
      isPublic: true,
      date: new Date(form.date).getTime(),
      title: form.title,
      category: form.category,
      content: form.content,
    };
    const responseData = await apiClient.post(`api/community`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const updatePostAPI = async (form: EditPostFormType, token: string) => {
  try {
    const editedData = {
      title: form.title,
      category: form.category,
      content: form.content,
    };
    await apiClient.patch(`api/community/${form.id}`, editedData, {
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

export const deletePostAPI = async (id: string, token: string) => {
  try {
    await apiClient.delete(`api/community/${id}`, {
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

export const updateLikeAPI = async (id: string, token: string) => {
  try {
    const responseData = await apiClient.post(`api/community/${id}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseData.data.message;
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
