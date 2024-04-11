export interface UserData {
  isLoggedIn: boolean;
  token: string;
  tokenExpiration: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  userId: string;
  uid?: string;
  name: string;
  email: string;
  image: string;
}
