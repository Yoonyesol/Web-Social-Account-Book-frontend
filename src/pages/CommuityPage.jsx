import React from "react";
import styled from "styled-components";
import CommunityBoard from "../components/Board/CommunityBoard";

export default function CommunityPage({ userInfo }) {
  return (
    <Section>
      <CommunityBoard user={userInfo} />
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
