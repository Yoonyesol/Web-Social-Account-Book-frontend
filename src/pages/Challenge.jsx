import React from "react";
import styled from "styled-components";
import ChattingMain from "../components/Challenge/ChattingMain";

export default function ChallengePage() {
  return (
    <Section>
      <ChattingMain />
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;
