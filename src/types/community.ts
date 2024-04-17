import { UserInfoType } from "../types";

/* ----------------- 게시글 ------------------ */
export interface PostCardType {
  _id: string;
  title: string;
  writer: UserInfoType;
  content: string;
}

export interface PostEntity extends PostCardType {
  category: string;
  comments: string[];
  date: string;
  hit: number;
  id: string;
  index: number;
  like: string[];
}

export interface EditPostFormType {
  id?: string;
  title: string;
  content: string;
  category?: string;
}

export interface PostFormType extends EditPostFormType {
  date: Date;
  writer: string;
}

/* ----------------- 댓글 ------------------ */
export interface CommentEntity {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: number;
}

export interface CommentFormType {
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
}
