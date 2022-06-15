import React from "react";
import styled from "styled-components";
import MsgCard from "./MsgCard";

export default function ChattingSidebar() {
  const dummyData = [
    { nickname: "카페 방문 5회 이내", createdAt: "2022-04-01", content: "test-01" },
    { nickname: "편의점 방문 9회 이내", createdAt: "2022-04-30", content: "test-02" },
    { nickname: "총 지출 30만원", createdAt: "2022-05-01", content: "test-03" },
    { nickname: "예산 40만원", createdAt: "2022-05-03", content: "test-04" },
    { nickname: "100만원 수입", createdAt: "2022-05-27", content: "test-05" },
    { nickname: "120만원 수입", createdAt: "2022-06-04", content: "test-06" },
  ];

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <span>챌린지 목록</span>
          </div>
          <div className="listContainer">
            <ListBox>
              {dummyData.map((item, i) => {
                return <MsgCard item={item} i={i} />;
              })}
            </ListBox>
          </div>
        </div>
      </Section>
    </>
  );
}

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.section`
  flex: 2;
  margin-right: 2rem;
  background-color: #efecf5;
  height: 93vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4rem;
  padding: 2rem 1rem;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      span {
        font-size: 2rem;
        color: #3c76e0;
        font-family: "Gowun Batang", serif;
      }
    }
    .listContainer {
      float: left;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;

      ::-webkit-scrollbar {
        background-color: #8b8fc8;
        width: 0.15vw;
      }

      ::-webkit-scrollbar-thumb {
        background: #babde4;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-bottom: 2rem;
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    flex-direction: row;
    .top {
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;

      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }

      .listContainer {
        height: 30vh;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
`;
