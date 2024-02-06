import React from "react";
import styled from "styled-components";
import ChattingList from "./ChattingList";
import ChattingView from "./ChattingView";
export default function ChattingMain() {
  return (
    <Section>
      <ChattingList />
      <ChattingView />
    </Section>
  );
}

const Section = styled.section`
  display: flex;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;
