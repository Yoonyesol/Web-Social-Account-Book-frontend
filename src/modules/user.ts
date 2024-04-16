import { UserData, UserInfo } from "../interfaces/UserData";

/* ----------------- 액션 타입 ------------------ */
export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS" as const;
export const LOGOUT = "user/LOGOUT" as const;
export const SET_USER_INFO = "user/SET_USER_INFO" as const;
export const SET_TOKEN = "user/SET_TOKEN" as const;
export const SET_TOKEN_EXPIRATION = "user/SET_TOKEN_EXPIRATION" as const;

/* ----------------- 액션 생성 함수 ------------------ */
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const logout = () => ({ type: LOGOUT });
export const setUserInfo = (userInfo: UserInfo) => ({ type: SET_USER_INFO, payload: userInfo });
export const setToken = (token: string) => ({ type: SET_TOKEN, payload: token });
export const setTokenExpiration = (expiration: string) => ({ type: SET_TOKEN_EXPIRATION, payload: expiration });

type UserAction =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logout>
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof setToken>
  | ReturnType<typeof setTokenExpiration>;

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState: UserData = {
  isLoggedIn: false,
  userInfo: null,
  token: "",
  tokenExpiration: "",
};

/* ----------------- 리듀서 ------------------ */
const userReducer = (state: UserData = initialState, action: UserAction): UserData => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { isLoggedIn: false, userInfo: null, token: "", tokenExpiration: "" };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_TOKEN_EXPIRATION:
      return { ...state, tokenExpiration: action.payload };
    default:
      return state;
  }
};

export default userReducer;
