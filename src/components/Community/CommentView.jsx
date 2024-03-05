import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteCommentAPI, fetchAllCommentsByPostIdAPI } from "../../utils/commentAPI";
import { setDate } from "../../constants/function";
import Button from "../../common/Button";
import { CommentEditor } from "./CommentEditor";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";

export function CommentView({ userInfo, postId }) {
  const token = useSelector((state) => state.user.token);

  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetchAllCommentsByPostIdAPI(postId);
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.log("API 호출 도중 에러 발생:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleEdit = (comment) => {
    setIsEdit(true);
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditingComment(null);
  };

  const handleRemoveComment = async (id) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deleteCommentAPI(id, token);
        setIsLoading(false);
        fetchComments();
      } catch (error) {
        alert("댓글 삭제에 실패했습니다.", error.message);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      <div className="comment-count">
        댓글 | 총 <b>{data.length}</b>개
      </div>
      <div className="comment-container">
        {data.map((item) => (
          <div key={item._id} className="comment">
            <div className="comment-writer">
              <b>{item.authorName}</b>
            </div>
            <div className="comment-main">
              {editingComment && editingComment._id === item._id ? (
                <CommentEditor
                  isEdit={isEdit}
                  userInfo={userInfo}
                  postId={postId}
                  comment={editingComment}
                  onCancelEdit={handleCancelEdit}
                  onFetchData={fetchComments}
                />
              ) : (
                <div className="p-container">
                  <p className="comment-content">{item.content}</p>
                  <p className="comment-date">{setDate(item.createdAt, true)}</p>
                </div>
              )}
              {!isEdit && userInfo.userId === item.authorId && (
                <div className="btn-container">
                  <Button text="수정" onClick={() => handleEdit(item)} />
                  <Button text="삭제" type="button" color="red" onClick={() => handleRemoveComment(item._id)} />
                </div>
              )}
            </div>
          </div>
        ))}
        <CommentEditor isEdit={false} userInfo={userInfo} postId={postId} onFetchData={fetchComments} />
      </div>
    </Section>
  );
}

const Section = styled.section`
  .comment-count {
    margin: 15px 0;
  }

  .comment {
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;

    .comment-writer {
      padding: 15px;
      width: 130px;
      background-color: #e2e1e1;
    }

    .comment-main {
      display: flex;
      justify-content: space-between;
      flex: 1;

      .p-container {
        padding: 15px;
        display: flex;
        width: 80%;
        flex-direction: column;
        gap: 0.5rem;

        .comment-date {
          font-size: 13px;
          color: #b6b4b4;
        }
      }
    }

    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
