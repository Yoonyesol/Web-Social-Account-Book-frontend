/* ----------------- 액션 타입 ------------------ */
export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGOUT = "user/LOGOUT";
export const SET_USER_INFO = "user/SET_USER_INFO";
export const SET_TOKEN = "user/SET_TOKEN";

/* ----------------- 액션 생성 함수 ------------------ */
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const logout = () => ({ type: LOGOUT });
export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, payload: userInfo });
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  isLoggedIn: false,
  userInfo: null,
  token: null,
};

/* ----------------- 리듀서 ------------------ */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false, token: null };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default userReducer;
