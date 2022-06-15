import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import { friendsData } from "./FriendDummy";
import { myFriends } from "./FriendDummy";

export default function FriendSearch() {
  const [inputText, setInputText] = useState("");
  //const [friends, setFriends] = useState([]);
  const [friends, setFriends] = useState(friendsData);
  const [myFriendList, setMyFriendList] = useState(myFriends);

  //json dummy data
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setFriends(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = friends.filter((el) => {
    //아무런 입력도 들어오지 않았을 때
    if (inputText === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(inputText);
    }
  });

  return (
    <Section>
      <div className="search">
        <BiSearch />
        <input type="text" placeholder="Search" onChange={inputHandler} />
      </div>
      <div className="searchResult">
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              {item.name}
              <span> (id: {item.id})</span>
              <button>추가</button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;

  .search {
    background-color: #d3e0f8;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: black;
    }
    input {
      background-color: transparent;
      border: none;
      font-size: 13px;
      font-weight: 700;
      color: #6c5a74;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
      &::placeholder {
        color: #6c5a74;
      }
      &:focus {
        outline: none;
      }
    }
  }

  .searchResult {
    background-color: #ebf0fc;
    height: auto;
    max-height: 13vh;
    overflow-x: hidden;
    overflow-y: auto;
    align-items: center;
    padding: 0.7rem 2.5rem;
    border-radius: 1rem;

    span {
      color: grey;
      font-size: 13px;
    }

    button {
      margin: 0rem 0 0.25rem 1rem;
      background-color: #5d8de6;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      font-family: "Gowun Batang", serif;
      color: white;
      border-radius: 0.5rem;
      border: 0;
      outline: 0;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
