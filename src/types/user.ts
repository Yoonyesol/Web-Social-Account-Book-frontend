export interface UserEntity {
  isLoggedIn: boolean;
  token: string;
  tokenExpiration: string;
  userInfo: UserInfoType;
}

export type UserInfoType = {
  userId: string;
  uid?: string;
  name: string;
  email: string;
  image: string;
};

export interface AuthResponseType {
  userInfo: UserInfoType;
  token: string;
}

export interface AuthFormType {
  email: string;
  name?: string;
  password: string;
}
