import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { cardStyle, cardStyleRealWhite } from "../../common/CardStyles";
import { useSelector } from "react-redux";
import { fetchLikedPostByUidAPI } from "../../utils/communityAPI";
import { RootState } from "../../modules/rootReducer";
import { PostCardType } from "../../types";

export default function PostCard() {
  const token: string = useSelector((state: RootState) => state.user.token);
  const nav = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLikedPostByUid = async () => {
      try {
        const post = await fetchLikedPostByUidAPI(token);
        setData(post);
      } catch (error) {
        console.log("유저별 공감한 게시글 API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchLikedPostByUid();
  }, [token]);

  return (
    <Section>
      <div className="title">
        <h2>최근 공감한 글</h2>
      </div>
      <div className="container">
        {data.length ? (
          data.map((post: PostCardType) => {
            return (
              <div className="card" key={post._id} onClick={() => nav(`/community/${post._id}`)}>
                <div className="post-title">
                  <h3>{post.title}</h3>
                </div>
                <div className="post-writer">
                  <h5>w. {post.writer.name}</h5>
                </div>
                <div className="post-content">
                  <span>{post.content.slice(0, 20)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="comment">
            <h3>공감한 글이 존재하지 않습니다.</h3>
          </div>
        )}
      </div>
      <Link to="/community" className="view">
        전체 게시글 바로가기 <HiArrowNarrowRight />
      </Link>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: pointer;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: #8b8fc8;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #c3c6f192;
  }

  .title {
    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .card {
      ${cardStyleRealWhite}
      padding: 1rem 2rem;
      border: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .post-title {
        color: #f75c82;
        gap: 15px;
      }
    }
  }

  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #3c76e0;
    font-family: "Gowun Batang", serif;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }

  .comment {
    margin: 2rem 0;
    text-align: center;
    h3 {
      color: black;
      font-family: "Gowun Batang", serif;
    }
    span {
      color: red;
      font-family: "Gowun Batang", serif;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .container {
      .post {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
