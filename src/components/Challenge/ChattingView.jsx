import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { RecieveChatCard, SeneChatCard } from "./ChatCard";
import Setgoal from "./SetGoal";

const socket = io.connect("http://localhost:80");

export default function ChattingView({ userInfo }) {
  //const [room, setRoom] = useState("");
  const room = 1;
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState({ room: "", author: "", message: "", time: "" });

  // const joinRoom = () => {
  //   if (userInfo.name !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   }
  // };

  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  const sendMessage = useCallback(() => {
    socket.emit("send message", {
      author: userInfo.name,
      message: chat.message,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
    setCurrentMessage("");
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  const changeMessage = useCallback(
    (e) => {
      setChat({
        message: e.target.value,
      });
      setCurrentMessage(e.target.value);
    },
    [chat],
  );

  return (
    <Section>
      {/* {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>

          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : ( */}
      <>
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
            value={currentMessage}
            onChange={changeMessage}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </>
      {/* )} */}
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
