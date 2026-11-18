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
  comments?: string[];
  commentCount?: number;
  date: string;
  hit: number;
  id: string;
  index: number;
  like?: string[];
  likeCount?: number;
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
export interface CommentFormType {
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
}

export interface CommentEntity extends Pick<CommentFormType, "authorName" | "content"> {
  authorId?: string;
  postId?: string;
  _id: string;
  createdAt: number;
}
