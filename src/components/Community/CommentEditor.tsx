import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useState } from "react";
import { createCommentAPI, updateCommentAPI } from "../../utils/commentAPI";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";
import { UserInfo } from "../../interfaces/UserData";
import { CommentData } from "./CommentView";
import { StoreData } from "../../interfaces/StoreData";

export interface CommentFormType {
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
}

interface CommentEditorProps {
  isEdit: boolean;
  postId: string;
  userInfo: UserInfo;
  comment?: CommentData;
  onCancelEdit?: () => void;
  onFetchData: () => Promise<void>;
}

export function CommentEditor({ isEdit, postId, userInfo, comment, onCancelEdit, onFetchData }: CommentEditorProps) {
  const token: string = useSelector((state: StoreData) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(isEdit && comment ? comment!.content : "");

  const [form, setForm] = useState<CommentFormType>({
    postId,
    authorId: userInfo.userId,
    authorName: userInfo.name,
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (!isEdit) {
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setUpdatedContent(e.target.value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isEdit || comment === undefined || onCancelEdit === undefined) {
      try {
        await createCommentAPI(form, token);
        setIsLoading(false);
        alert("저장되었습니다!");
        onFetchData();
        setForm((prevForm) => ({
          ...prevForm,
          content: "",
        }));
      } catch (error) {
        setIsLoading(false);
        alert("댓글 작성에 실패했습니다." + error.message);
      }
    } else {
      try {
        await updateCommentAPI(comment._id, updatedContent, token);
        setIsLoading(false);
        alert("수정되었습니다!");
        onFetchData();
        onCancelEdit();
      } catch (error) {
        setIsLoading(false);
        alert("댓글 수정에 실패했습니다." + error.message);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      <form onSubmit={onSubmit} className="editor-comment">
        <div className="editor-comment-writer">
          <b>{userInfo.name}</b>
        </div>
        <div className="main-btn-container">
          <div className="editor-comment-main">
            <textarea
              required
              name="content"
              placeholder="댓글 내용을 입력해 주세요."
              value={isEdit ? updatedContent : form.content}
              onChange={handleChange}
            />
          </div>
          <div className="btn-container">
            {isEdit ? (
              <>
                <Button text="등록" type="submit" />
                <Button text="취소" color="red" onClick={onCancelEdit} />
              </>
            ) : (
              <Button text="작성" type="submit" />
            )}
          </div>
        </div>
      </form>
    </Section>
  );
}

const Section = styled.section`
  .editor-comment {
    border: none;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
  }

  .editor-comment-writer {
    padding: 5px;
  }

  .main-btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;

    .editor-comment-main {
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding: 5px 0;
      width: 100%;
    }

    textarea {
      flex: 1;
      resize: none;
      border-radius: 5px;
      display: flex;
      padding: 10px;
      height: 5rem;
    }

    .btn-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      padding-right: 0;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 400px) {
    .main-btn-container {
      flex-direction: column;

      .btn-container {
        width: 100%;
        justify-content: end;
        flex-direction: row;
        padding: 0;
      }
    }
  }
`;
