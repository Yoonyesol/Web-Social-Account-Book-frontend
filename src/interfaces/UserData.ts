export interface UserData {
  isLoggedIn: boolean;
  token: string;
  tokenExpiration: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  name: string;
  email: string;
  image: string;
}
