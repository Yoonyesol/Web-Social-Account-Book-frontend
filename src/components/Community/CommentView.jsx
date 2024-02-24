import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllCommentsByPostIdAPI } from "../../utils/commentAPI";
import { setDate } from "../../constants/function";

export function CommentView({ postId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchAllCommentsByPostIdAPI(postId);
        setData(responseData);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };

    fetchData();
  }, [postId]);

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
              <p className="comment-content">{item.content}</p>
              <p className="comment-date">{setDate(item.createdAt, true)}</p>
            </div>
          </div>
        ))}
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
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .comment-date {
        font-size: 13px;
        color: #b6b4b4;
      }
    }
  }
`;
