import { UserEntity } from "../types";

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
  writer: UserEntity;
  _id: string;
}
