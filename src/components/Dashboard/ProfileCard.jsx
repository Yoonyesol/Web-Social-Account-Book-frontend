import React from "react";
import styled from "styled-components";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyle } from "../../common/CardStyles";

export default function Profile({ user }) {
  return (
    <Section>
      <div className="image">
        <img src="https://cdn.pixabay.com/photo/2022/03/30/19/19/mountain-7101737_960_720.jpg" alt="profile" />
      </div>
      <div className="title">
        <h2>{user.currentUser.name}</h2>
        <h5>
          <HiOutlineLocationMarker />
          한국, 인천광역시
        </h5>
      </div>
      <div className="info">
        <div className="container">
          <h5>예산</h5>
          <h3>300,000원</h3>
        </div>
        <div className="container">
          <h5>수입</h5>
          <h3>190,000원</h3>
        </div>
        <div className="container">
          <h5>지출</h5>
          <h3>30,000원</h3>
        </div>
      </div>
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
`;
