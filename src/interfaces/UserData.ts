export interface UserData {
  isLoggedIn: boolean;
  token: string;
  tokenExpiration: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  userId?: string;
  name: string;
  email: string;
  image: string;
}
