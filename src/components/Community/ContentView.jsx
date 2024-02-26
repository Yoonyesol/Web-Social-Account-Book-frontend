import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../common/Button";
import LoadingIndicator from "../../common/LoadingIndicator";
import { setDate } from "../../constants/function";
import { deletePostAPI, fetchPostByCidAPI } from "../../utils/communityAPI";
import { CommentView } from "./CommentView";
import { CommentEditor } from "./CommentEditor";

const ContentView = () => {
  const nav = useNavigate();
  const params = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState();

  useEffect(() => {
    const fetchPostByCid = async () => {
      try {
        const post = await fetchPostByCidAPI(params.cid);
        setSelectedPost(post);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchPostByCid();
  }, [params.cid]);

  if (!selectedPost) {
    return <LoadingIndicator />;
  }

  const handleEditPost = (item) => {
    nav(`/community/${item.id}/edit`, {
      state: {
        id: item.id,
        category: item.category,
        title: item.title,
        writer: item.writer,
        content: item.content,
      },
    });
  };

  const handleRemovePost = async () => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await deletePostAPI(params.cid, token);
        alert("삭제되었습니다!");
        setIsLoading(false);
        nav("/community", { replace: true });
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <Section>
      {isLoading && <LoadingIndicator />}
      <div className="post-container">
        <div className="title">
          <h3>{`[${selectedPost.category}] ${selectedPost.title}`}</h3>
        </div>
        <div className="user-view">
          <div className="user-img">
            <img src="https://cdn.pixabay.com/photo/2022/03/30/19/19/mountain-7101737_960_720.jpg" alt="사진" />
          </div>
          <div className="user-info">
            <p className="writer">
              <b>{selectedPost.writer.name}</b>
            </p>
            <p className="date">작성일: {setDate(selectedPost.date, true)} </p>
            <div style={{ margin: "10px" }}></div>
            <p className="content-info">
              공감 {selectedPost.like.length} | 조회 {selectedPost.hit}
            </p>
          </div>
        </div>
        <div className="blank" />
        <div className="content-view">
          <div className="content-main">{selectedPost.content}</div>
          <div className="btn-container">
            <Button text="공감" type="button" color="purple" />
          </div>
        </div>
        <div className="btn-container">
          {userInfo.userId === selectedPost.writer.uid && (
            <>
              <Button text="수정" type="button" onClick={() => handleEditPost(selectedPost)} />
              <Button text="삭제" type="button" color="red" onClick={handleRemovePost} />
            </>
          )}
          <Button text="목록" type="button" color="grey" onClick={() => nav("/community")} />
        </div>
      </div>
      <CommentView userInfo={userInfo} postId={selectedPost.id} />
      {/* <CommentEditor userInfo={userInfo} postId={selectedPost.id} /> */}
    </Section>
  );
};

export default ContentView;

const Section = styled.section`
  margin-left: 18vw;
  padding: 1.5rem;
  height: 100%;
  font-size: 14px;

  .post-container,
  .comment-container {
    margin: 0px auto 20px auto;
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #ccc;
  }

  .title {
    background-color: #e2e1e1;
    padding: 10px;
  }

  .user-view {
    padding: 15px;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-bottom: 1px solid #e2e1e1;
  }

  .user-img {
    width: 100px;
    height: 100px;

    img {
      object-fit: cover;
      width: 100px;
      height: 100px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .blank {
    height: 50px;
    background-color: #e2e1e1;
  }

  .content-view {
    padding: 10px;
    border-bottom: 1px solid #e2e1e1;

    .content-main {
      min-height: 300px;
    }

    .btn-container {
      display: flex;
      justify-content: center;

      button {
        font-family: "Montserrat", sans-serif;
        font-size: 13px;
        padding: 20px;
      }
    }
  }

  .btn-container {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: end;

    button {
      font-family: "Montserrat", sans-serif;
      font-size: 12px;
      padding: 5px 10px;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;
