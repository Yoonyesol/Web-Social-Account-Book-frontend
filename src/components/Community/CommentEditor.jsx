import styled from "styled-components";
import Button from "../../common/Button";
import { cardStyle } from "../../common/CardStyles";
import { useState } from "react";
import { createCommentAPI } from "../../utils/commentAPI";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";

export function CommentEditor({ userInfo, postId }) {
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    postId,
    authorId: userInfo.userId,
    authorName: userInfo.name,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createCommentAPI(form, token);
      setIsLoading(false);
      alert("저장되었습니다!");
      setForm({
        content: "",
      });
    } catch (error) {
      setIsLoading(false);
      console.log("post 진행 중 오류가 발생했습니다.", error.message);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      <div className="comment-input">
        <form onSubmit={onSubmit}>
          <div className="author">
            <b>{userInfo.name}</b>
          </div>
          <div className="comment-textarea">
            <textarea
              required
              name="content"
              placeholder="댓글 내용을 입력해 주세요."
              value={form.content}
              onChange={handleChange}
            />
          </div>
          <Button text="작성" type="submit" />
        </form>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 25px 0;
  .comment-input {
    ${cardStyle}
    display: flex;
    flex-direction: column;

    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    textarea {
      display: flex;
      padding: 10px;
      height: 4rem;
      width: 100%;
    }

    button {
      font-family: "Montserrat", sans-serif;
      font-size: 13px;
      padding: 8px;
      width: 50px;
    }
  }
`;
