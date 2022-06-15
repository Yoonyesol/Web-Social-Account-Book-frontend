import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import FriendSearch from "./FriendSearch";
import axios from "axios";
import { BiBlock } from "react-icons/bi";
import { myFriends } from "./FriendDummy";

export default function FriendsTable() {
  //const [friends, setFriends] = useState([]);
  const [friends, setFriends] = useState(myFriends);

  const nextId = useRef(6);

  //json dummy data
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setFriends(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleRemove = (id) => {
    if (window.confirm("친구목록에서 삭제하시겠습니까?")) {
      setFriends((friends) => friends.filter((item) => item.id !== id));
      alert("친구목록에서 삭제되었습니다");
    } else {
    }
  };

  return (
    <Section>
      <div className="title">
        <h2>친구 목록</h2>
      </div>
      <FriendSearch />
      <table className="table">
        <thead>
          <tr className="th">
            <th>Id.</th>
            <th>이름</th>
            <th>이메일</th>
            <th>차단</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <BiBlock onClick={() => handleRemove(item.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}

const Section = styled.section`
  margin: 0 5.5rem;

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

  .table {
    border-collapse: collapse;
    text-align: center;
    line-height: 1.5;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 20px 0;
    th {
      width: 150px;
      padding: 6px;
      font-weight: bold;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      background: #efefef;
    }
    td {
      width: 350px;
      padding: 10px;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: red;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0;
  }
`;
