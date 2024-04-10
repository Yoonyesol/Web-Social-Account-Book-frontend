import { UserInfo } from "./UserData";

export interface PostData {
  category: string;
  comments: string[];
  content: string;
  date: string;
  hit: number;
  id: string;
  index: number;
  like: string[];
  title: string;
  writer: UserInfo;
  _id: string;
}
