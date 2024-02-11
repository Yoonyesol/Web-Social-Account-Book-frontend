import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Community/Pagination";
import { fetchAllPostsAPI } from "../utils/communityAPI";
import Button from "../common/Button";
import LoadingIndicator from "../common/LoadingIndicator";
import { setDate } from "../constants/function";

export default function Community() {
  const nav = useNavigate();
  const [board, setBoard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지수
  const [postsPerPage] = useState(10); //한 페이지당 게시물 수

  //페이지 이동
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(data) {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await fetchAllPostsAPI();
        setBoard(posts);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchAllPosts();
  }, []);

  if (board.length === 0 || !board) {
    return <LoadingIndicator />;
  }

  const handlePostDetail = (item) => {
    nav(`/community/${item.id}`, {
      replace: true,
    });
  };

  return (
    <Section>
      <div className="title">
        <h2>커뮤니티</h2>
      </div>
      <Button text="작성하기" onClick={() => nav("/community/new")} />
      <div className="board">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th style={{ textAlign: "start" }}>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회</th>
              <th>공감</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {board.map((item, idx) => (
              <tr key={item._id}>
                <td className="td-idx">{idx}</td>
                <td className="td-category">{item.category}</td>
                <td className="td-title" onClick={() => handlePostDetail(item)}>
                  {item.title}
                </td>
                <td className="td-writer">{item.writer.name}</td>
                <td className="td-hit">{item.hit}</td>
                <td className="td-like">{item.like.length}</td>
                <td className="td-date">{setDate(item.date, false)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination postsPerPage={postsPerPage} totalPosts={board.length} paginate={setCurrentPage}></Pagination>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;

  .title {
    display: flex;
    justify-content: center;

    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }

  .board {
    display: flex;
    flex-direction: column;
  }

  button {
    font-size: 14px;
    margin: 0px 10px;
  }

  .table {
    font-size: 14px;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid #ccc;
    background: white;
    margin: 20px 10px;

    th {
      padding: 10px;
      font-weight: bold;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      background: #efefef;
      text-align: center;
    }

    .td-idx {
      width: 5%;
    }

    .td-category {
      width: 15%;
      text-align: start;
    }

    .td-title {
      width: 30%;
      text-align: start;
      cursor: pointer;
    }

    .td-writer {
      width: 20%;
    }

    .td-hit,
    .td-like {
      width: 7%;
    }

    .td-date {
      width: 10%;
    }

    td {
      width: 350px;
      padding: 10px;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      text-overflow: ellipsis;
    }

    svg {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;

    .table {
      margin: 10px;
    }
  }
`;
