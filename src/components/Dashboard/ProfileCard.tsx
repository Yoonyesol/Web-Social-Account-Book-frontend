import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiArrowNarrowRight, HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyle } from "../../common/CardStyles";
import { UserInfoType } from "../../types";
import { RootState } from "../../modules/rootReducer";

export default function Profile() {
  const userInfo: UserInfoType = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Section>
      <div className="image">
        <img src="https://cdn.pixabay.com/photo/2022/03/30/19/19/mountain-7101737_960_720.jpg" alt="profile" />
      </div>
      <div className="title">
        <h2>{userInfo.name}</h2>
        <h5>
          <HiOutlineLocationMarker />
          한국, 서울
        </h5>
      </div>
      <div className="info">
        <div className="container">
          <h5>연락처</h5>
          <h4>{userInfo.email}</h4>
        </div>
      </div>
      <Link to="/profile" className="view">
        설정 바로가기 <HiArrowNarrowRight />
      </Link>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    margin-top: 10px;
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h5 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .container {
      text-align: center;
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #3c76e0;
    font-family: "Gowun Batang", serif;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
`;
