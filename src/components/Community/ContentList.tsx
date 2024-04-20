import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { setDate } from "../../constants/function";
import { PostEntity } from "../../types/community";
import Pagination from "./Pagination";
import LoadingIndicator from "../../common/LoadingIndicator";

export default function ContentList({ data, isSearch, searchKeyword }) {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지수
  const [postsPerPage] = useState<number>(15); //한 페이지당 게시물 수

  if ((!data || data.length === 0) && !isSearch) {
    return <LoadingIndicator />;
  }

  //페이지 이동
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(data: PostEntity[]) {
    if (data) {
      let currentPosts: PostEntity[];
      currentPosts = data.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    }
  }

  const handlePostDetail = (item: PostEntity) => {
    nav(`/community/${item.id}`);
  };

  return (
    <ContentListDiv>
      <div className="title">
        <h2>커뮤니티</h2>
      </div>
      <Button text="작성하기" onClick={() => nav("/community/new")} />
      <div className="board">
        {isSearch && (
          <div style={{ padding: "16px 16px 0px 16px" }}>
            '<b>{searchKeyword}</b>'에 대한 검색결과입니다.
          </div>
        )}
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
            {isSearch && (!data || data.length === 0) ? (
              <div>데이터가 존재하지 않습니다.</div>
            ) : (
              currentPosts(data)!.map((item) => (
                <tr key={item._id}>
                  <td className="td-idx">{item.index}</td>
                  <td className="td-category">{item.category}</td>
                  <td className="td-title" onClick={() => handlePostDetail(item)}>
                    {item.title}
                    <b style={{ color: "#f8764c" }}> ({item.comments.length})</b>
                  </td>
                  <td className="td-writer">{item.writer.name}</td>
                  <td className="td-hit">{item.hit}</td>
                  <td className="td-like">{item.like.length}</td>
                  <td className="td-date">{setDate(item.date, false)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data ? data.length : 0}
          currentPage={currentPage}
          paginate={setCurrentPage}
        ></Pagination>
      </div>
    </ContentListDiv>
  );
}

const ContentListDiv = styled.div`
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

    .td-category {
      text-align: start;
    }

    .td-title {
      text-align: start;
      cursor: pointer;
    }

    td {
      padding: 10px;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
    }

    svg {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 550px) {
    .table {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 800px) {
    .table {
      table-layout: fixed;
    }

    .table thead {
      display: none;
    }

    .table tr {
      display: block;
      margin-bottom: 10px;
    }

    .table th,
    .table td {
      display: block;
      position: relative;
      padding: 10px 0;
      padding-left: 30%;
      border-width: 0 0 1px 0;
    }

    .table td:before {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 30%;
      padding: 10px 0;
      background: #ccc;
    }

    .table {
      .td-idx {
        font-weight: bold;
        background: #b4b3b3;
      }

      .td-category {
        text-align: center;
      }

      .td-title {
        text-align: center;
        cursor: pointer;
      }
    }

    .table td:nth-child(1):before {
      content: "ID";
      font-weight: bold;
      background: #b4b3b3;
    }
    .table td:nth-child(2):before {
      content: "카테고리";
    }
    .table td:nth-child(3):before {
      content: "제목";
      height: 100%;
    }
    .table td:nth-child(4):before {
      content: "작성자";
    }
    .table td:nth-child(5):before {
      content: "조회";
    }
    .table td:nth-child(6):before {
      content: "공감";
    }
    .table td:nth-child(7):before {
      content: "작성일";
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .table {
      margin: 10px;
    }
  }
`;
