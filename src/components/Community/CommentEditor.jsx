import styled from "styled-components";
import Button from "../../common/Button";
import { useState } from "react";
import { createCommentAPI, updateCommentAPI } from "../../utils/commentAPI";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";

export function CommentEditor({ isEdit, postId, userInfo, comment, onCancelEdit }) {
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(isEdit ? comment.content : "");

  const [form, setForm] = useState({
    postId,
    authorId: userInfo.userId,
    authorName: userInfo.name,
    content: "",
  });

  const handleChange = (e) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isEdit) {
      try {
        await createCommentAPI(form, token);
        setIsLoading(false);
        alert("저장되었습니다!");
        setForm({
          content: "",
        });
      } catch (error) {
        setIsLoading(false);
        console.log("댓글 작성 중 오류가 발생했습니다.", error.message);
      }
    } else {
      try {
        await updateCommentAPI(comment._id, updatedContent, token);
        setIsLoading(false);
        alert("수정되었습니다!");
        onCancelEdit();
      } catch (error) {
        setIsLoading(false);
        console.log("댓글 수정 중 에러 발생:", error.message);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      {console.log(comment)}
      <form onSubmit={onSubmit} className="comment">
        {!isEdit && (
          <div className="comment-writer">
            <b>{userInfo.name}</b>
          </div>
        )}
        <div className="comment-main-btn-container">
          <div className="comment-main">
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
  .comment {
    border: none;
  }

  .comment-main-btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
    flex: 1;

    .comment-main {
      padding: 8px;
    }

    textarea {
      flex: 1;
      resize: none;
      border-radius: 5px;
      display: flex;
      padding: 10px;
      height: 5rem;
    }
  }
`;
