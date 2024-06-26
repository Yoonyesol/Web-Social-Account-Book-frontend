import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteCommentAPI, fetchAllCommentsByPostIdAPI } from "../../utils/commentAPI";
import { setDate } from "../../constants/function";
import Button from "../../common/Button";
import { CommentEditor } from "./CommentEditor";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";
import { RootState } from "../../modules/rootReducer";
import { CommentEntity } from "../../types";
import Colors from "../../styles/Colors";

export function CommentView({ userInfo, postId }) {
  const token: string = useSelector((state: RootState) => state.user.token);

  const [data, setData] = useState<CommentEntity[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingComment, setEditingComment] = useState<CommentEntity | null>(null);
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

  const handleEdit = (comment: CommentEntity) => {
    setIsEdit(true);
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditingComment(null);
  };

  const handleRemoveComment = async (id: string) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deleteCommentAPI(id, token);
        setIsLoading(false);
        fetchComments();
      } catch (error) {
        alert("댓글 삭제에 실패했습니다." + error.message);
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
        {data.map((item: CommentEntity) => (
          <div key={item._id}>
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
              <div className="comment">
                <div className="comment-writer">
                  <b>{item.authorName}</b>
                </div>
                <div className="comment-main">
                  <div className="p-container">
                    <p className="comment-content">{item.content}</p>
                    <p className="comment-date">{setDate(item.createdAt, true)}</p>
                  </div>
                  {!isEdit && userInfo.userId === item.authorId && (
                    <div className="btn-container">
                      <Button text="수정" onClick={() => handleEdit(item)} />
                      <Button text="삭제" type="button" color="red" onClick={() => handleRemoveComment(item._id)} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <CommentEditor isEdit={false} postId={postId} userInfo={userInfo} onFetchData={fetchComments} />
      </div>
    </Section>
  );
}

const Section = styled.section`
  .comment-count {
    margin: 15px 0;
  }

  .comment {
    border-bottom: 1px solid ${Colors.BORDER_GRAY};
    display: flex;
    flex-direction: row;

    .comment-writer {
      padding: 15px;
      width: 130px;
      background-color: ${Colors.COMMUNITY_GRAY};
    }

    .comment-main {
      display: flex;
      justify-content: space-between;
      flex: 1;

      .p-container {
        padding: 15px 0px 15px 15px;
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
      justify-content: center;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 500px) {
    .comment {
      .comment-writer {
        padding: 8px;
        width: 80px;
      }
    }
  }
`;
