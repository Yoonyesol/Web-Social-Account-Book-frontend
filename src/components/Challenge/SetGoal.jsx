import React from "react";
import styled from "styled-components";

const Setgoal = () => {
  return (
    <>
      <Card>
        <SetCard>
          <div className="goalContainer">
            <h3>목표</h3>
            <button>목표 설정</button>
          </div>
          <div>카페 방문 5회 이내</div>
        </SetCard>
      </Card>
    </>
  );
};

export default Setgoal;

const Card = styled.div`
  width: 100%;
`;

const SetCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin: 0rem 10rem;
  background-color: #ccd8ee;
  color: black;
  border-radius: 10px;

  .goalContainer {
    display: flex;
    justify-content: space-between;
    button {
      width: 5rem;
      height: 30px;
      border-radius: 4px;
      background-color: #8b8fc8;
      color: black;
      outline: none;
      border: none;
      &:hover {
        background-color: #6066be;
        color: white;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0rem 0.5rem;
  }
`;
