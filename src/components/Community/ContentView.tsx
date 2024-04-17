import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../common/Button";
import LoadingIndicator from "../../common/LoadingIndicator";
import { setDate } from "../../constants/function";
import { deletePostAPI, fetchPostByCidAPI, updateLikeAPI } from "../../utils/communityAPI";
import { CommentView } from "./CommentView";
import { MdThumbUp } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";
import { RootState } from "../../modules/rootReducer";
import { PostEntity, UserInfoType } from "../../types";

const ContentView = () => {
  const nav = useNavigate();
  const params = useParams();
  const userInfo: UserInfoType = useSelector((state: RootState) => state.user.userInfo);
  const token: string = useSelector((state: RootState) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostEntity>();
  const [like, setLike] = useState({ click: false, count: 0, animation: false });

  useEffect(() => {
    const fetchPostByCid = async () => {
      try {
        if (params.cid) {
          const post = await fetchPostByCidAPI(params.cid);
          setSelectedPost(post);
        }
      } catch (error) {
        console.log("게시글 정보 API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchPostByCid();
  }, [params.cid]);

  //마운트 시 좋아요 클릭상태 업데이트
  useEffect(() => {
    if (selectedPost) {
      if (selectedPost.like.includes(userInfo.userId)) {
        setLike({ click: true, count: selectedPost.like.length, animation: false });
      } else {
        setLike({ click: false, count: selectedPost.like.length, animation: false });
      }
    }
  }, [userInfo.userId, selectedPost]);

  if (!selectedPost) {
    return <LoadingIndicator />;
  }

  const handleEditPost = () => {
    nav(`/community/${selectedPost.id}/edit`, {
      state: {
        id: selectedPost.id,
        category: selectedPost.category,
        title: selectedPost.title,
        writer: selectedPost.writer,
        content: selectedPost.content,
      },
    });
  };

  const handleRemovePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        if (params.cid) {
          await deletePostAPI(params.cid, token);
          alert("삭제되었습니다!");
          setIsLoading(false);
          nav("/community", { replace: true });
        }
      } catch (error) {
        alert("게시글을 삭제하지 못했습니다." + error.message);
        setIsLoading(false);
      }
    }
  };

  const handleUpdateLike = async () => {
    try {
      await updateLikeAPI(selectedPost.id, token);
      if (like.click) {
        setLike({ count: like.count - 1, click: false, animation: true });
      } else {
        setLike({ count: like.count + 1, click: true, animation: true });
      }
    } catch (error) {
      alert("공감 상태를 업데이트하지 못했습니다." + error.message);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
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
              공감 {like.count} | 조회 {selectedPost.hit}
            </p>
          </div>
        </div>
        <div className="blank" />
        <div className="content-view">
          <div className="content-main">{selectedPost.content}</div>
          <div className="btn-container like-btn">
            <LikeButton onClick={handleUpdateLike} liked={like.click} animation={like.animation}>
              <span>{like.count}</span>
              {like.click ? <MdThumbUp /> : <FiThumbsUp />}
            </LikeButton>
          </div>
        </div>
        <div className="btn-container">
          {userInfo.userId === selectedPost.writer.uid && (
            <>
              <Button text="수정" type="button" onClick={handleEditPost} />
              <Button text="삭제" type="button" color="red" onClick={handleRemovePost} />
            </>
          )}
          <Button text="목록" type="button" color="grey" onClick={() => nav("/community")} />
        </div>
      </div>
      <CommentView userInfo={userInfo} postId={selectedPost.id} />
    </Section>
  );
};

export default ContentView;

const LikeButton = styled.button<{ liked: boolean; animation: boolean }>`
  background-color: ${({ liked }) => (liked ? "#8b8fc8" : "white")};
  color: ${({ liked }) => (liked ? "white" : "black")};
  font-size: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;

  span {
    font-weight: 500;
  }

  svg {
    font-size: 1.1rem;
  }

  ${({ liked, animation }) =>
    liked &&
    animation &&
    `
    animation: explodeAnimation 0.5s ease;
  `}

  @keyframes explodeAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

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
      white-space: pre-wrap;
      min-height: 300px;
    }

    .btn-container {
      display: flex;
      justify-content: center;

      button {
        padding: 15px 25px;
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
