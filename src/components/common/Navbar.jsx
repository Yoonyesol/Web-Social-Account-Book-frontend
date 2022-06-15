import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

export default function Navbar({ user }) {
  return (
    <Nav>
      <div className="title">
        <h4>hello {user.currentUser.name}</h4>
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
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;
          margin: 1rem 0;
        }
      }
    }
  }
`;
