import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules/rootReducer";

export default function Navbar() {
  const userName: string = useSelector((state: RootState) => state.user.userInfo.name);
  return (
    <Nav>
      <div className="title">
        <h4>
          hello <span className="user-name">{userName}</span>
        </h4>
        <h1>
          Welcome to <span>CASH DASHBOARD</span>
        </h1>
      </div>
      {/* <div className="search">
        <BiSearch />
        <input type="text" placeholder="Search" />
      </div> */}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: black;
  .title {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .user-name {
      font-size: 1.2rem;
      background: linear-gradient(to right top, #6369bd, #861657, #ffa69e);
      color: transparent;
      -webkit-background-clip: text;
    }

    h1 {
      span {
        margin-left: 0.5rem;
        color: #6e4da0;
        letter-spacing: 0.2rem;
        font-family: "Permanent Marker", cursive;
      }
    }
  }

  /* .search {
    background-color: #d3e0f8;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: black;
    }
    input {
      background-color: transparent;
      border: none;
      color: #6c5a74;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
      &::placeholder {
        color: #6c5a74;
      }
      &:focus {
        outline: none;
      }
    }
  } */
  @media screen and (min-width: 280px) and (max-width: 430px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;
          margin: 0.5rem 0;
        }
      }
    }
  }
`;
