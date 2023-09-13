import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import { RecieveChatCard, SeneChatCard } from "./ChatCard";
import Setgoal from "./SetGoal";

//서버 80번 포트에 연결 요청
const socket = io.connect("http://localhost:80");

export default function ChattingView({ userInfo }) {
  const [userInputMsg, setUserInputMsg] = useState("");
  const [chatArr, setChatArr] = useState([]);

  //서버에게서 받은 receive message이벤트에 대한 콜백
  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    });
  }, [socket]);

  //버튼 클릭 시 send message 이벤트 발생(메시지 전송)
  const sendMessageHandler = useCallback(() => {
    socket.emit("send message", {
      author: userInfo.name,
      message: userInputMsg,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
    setUserInputMsg("");
  }, [userInputMsg, userInfo.name]);

  //사용자에게 입력받은 채팅 내용을 기반으로 state 변경
  const changeMessage = useCallback((e) => {
    setUserInputMsg(e.target.value);
  }, []);

  return (
    <Section>
      <div className="top">
        <h3 id="chattingname">카페 방문 5회 이내</h3>
        <h5 id="personnel">5</h5>
      </div>
      <Setgoal />
      <div className="contentContainer">
        {chatArr.map((messageContent) => {
          return (
            <div>
              {userInfo.name === messageContent.author ? (
                <SeneChatCard massage={messageContent.message} time={messageContent.time} />
              ) : (
                <RecieveChatCard
                  massage={messageContent.message}
                  time={messageContent.time}
                  author={messageContent.author}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="sendContainer">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInputMsg}
          onChange={changeMessage}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessageHandler();
          }}
        />
        <button onClick={sendMessageHandler}>전송</button>
      </div>
    </Section>
  );
}

const Section = styled.section`
  flex: 4;
  background-color: #8eafeb;
  height: 93vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  gap: 2rem;

  .top {
    width: 100%;
    border-radius: 0.4rem 0.4rem 0rem 0rem;
    padding: 1rem 2rem;
    background-color: #6895e9;
    text-align: center;
    h3 {
      margin-bottom: 0.5rem;
    }
  }

  .contentContainer {
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
      background-color: #efecf5;
      width: 0.4vw;
    }

    ::-webkit-scrollbar-thumb {
      background: #8b8fc8;
    }
  }

  .sendContainer {
    padding: 1rem;
    width: 100%;
    flex-direction: row;
    input {
      flex: 4;
      border-radius: 0.4rem;
      height: 2.5rem;
      width: 90%;
    }
    button {
      width: 10%;
      height: 40px;
      border-radius: 4px;
      background-color: #4f85e9;
      color: #ffffff;
      outline: none;
      border: none;
      &:hover {
        background-color: #3070e6;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
  }
`;
