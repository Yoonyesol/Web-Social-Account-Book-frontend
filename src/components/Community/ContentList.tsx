import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { setDate } from "../../constants/function";
import { PostEntity } from "../../types/community";
import Pagination from "./Pagination";
import LoadingIndicator from "../../common/LoadingIndicator";
import Colors from "../../styles/Colors";

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
        <CommunityTable>
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
              <td colSpan={7} className="no-data">
                데이터가 존재하지 않습니다.
              </td>
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
        </CommunityTable>
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
      color: ${Colors.BLUE};
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
`;

const CommunityTable = styled.table`
  font-size: 14px;
  text-align: center;
  border-collapse: collapse;
  border: 1px solid ${Colors.BORDER_GRAY};
  background: white;
  margin: 20px 10px;

  th {
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid ${Colors.BORDER_GRAY};
    background: #efefef;
    text-align: center;
  }

  .no-data {
    vertical-align: middle;
    text-align: center;
    height: 50px;
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
    border-bottom: 1px solid ${Colors.BORDER_GRAY};
  }

  svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  @media screen and (min-width: 280px) and (max-width: 550px) {
    font-size: 13px;
  }

  @media screen and (max-width: 800px) {
    table-layout: fixed;

    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 10px;
    }

    th,
    td {
      display: block;
      position: relative;
      padding: 10px 0;
      padding-left: 30%;
      border-width: 0 0 1px 0;
    }

    .no-data:before {
      display: none;
    }

    .no-data {
      display: flex;
      border-bottom: none;
      padding: 0;
      justify-content: center;
      align-items: center;
    }

    td:before {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 30%;
      padding: 10px 0;
      background: ${Colors.BORDER_GRAY};
    }

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

    td:nth-child(1):before {
      content: "ID";
      font-weight: bold;
      background: #b4b3b3;
    }
    td:nth-child(2):before {
      content: "카테고리";
    }
    td:nth-child(3):before {
      content: "제목";
      height: 100%;
    }
    td:nth-child(4):before {
      content: "작성자";
    }
    td:nth-child(5):before {
      content: "조회";
    }
    td:nth-child(6):before {
      content: "공감";
    }
    td:nth-child(7):before {
      content: "작성일";
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 10px;
  }
`;
