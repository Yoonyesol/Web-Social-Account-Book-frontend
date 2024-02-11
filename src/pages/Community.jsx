import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Modal from "../common/Modal";
import Pagination from "../components/Community/Pagination";
import EditPostModal from "../components/Community/ContentView";
import { useSelector } from "react-redux";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { fetchAllPostsAPI } from "../utils/communityAPI";
import LoadingIndicator from "../common/LoadingIndicator";
import { setDate } from "../constants/function";

export default function Community() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const nav = useNavigate();
  const nextId = useRef(11);

  const [isEdit, setIsEdit] = useState(false);
  const [board, setBoard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지수
  const [postsPerPage] = useState(10); //한 페이지당 게시물 수
  const [selected, setSelected] = useState("");
  const [modalOn, setModalOn] = useState(false);

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

  const handleSave = (data) => {
    //데이터 수정
    if (data.id) {
      //수정데이터에는 id존재
      setBoard(
        board.map((row) =>
          data.id === row.id
            ? {
                id: data.id,
                title: data.title,
                writer: data.writer,
                content: data.content,
                date: data.date,
              }
            : row,
        ),
      );
    } else {
      //id 존재하지 않을 시, 데이터 추가
      setBoard((item) =>
        item.concat({
          id: nextId.current,
          title: data.title,
          writer: userInfo.name,
          content: data.content,
          date: data.date,
        }),
      );
      nextId.current += 1;
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      setBoard((info) => info.filter((item) => item.id !== id));
      alert("삭제 완료");
    }
  };

  const handlePostDetail = (item) => {
    nav(`/community/${item.id}`, {
      state: {
        category: item.category,
        title: item.title,
        writer: item.writer,
        content: item.content,
        date: item.date,
        hit: item.hit,
        like: item.like,
        comments: item.comments,
      },
    });
  };

  const handleEditSubmit = (item) => {
    handleSave(item);
    setModalOn(false);
  };

  function handleCancel() {
    setModalOn(false);
  }

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
        {modalOn && (
          <Modal visible={modalOn} closable={true} maskClosable={false} onClose={handleCancel}>
            <EditPostModal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />
          </Modal>
        )}
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
