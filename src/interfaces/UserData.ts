export interface UserData {
  isLoggedIn: boolean;
  token: string;
  tokenExpiration: string;
  userInfo: UserInfo | null;
}

export interface UserInfo {
  userId: string;
  uid?: string;
  name: string;
  email: string;
  image: string;
}

export interface AuthFormType {
  email: string;
  name?: string;
  password: string;
}
