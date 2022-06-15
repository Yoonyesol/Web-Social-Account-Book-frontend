import React from "react";
import styled from "styled-components";

import AccountBookHistory from "../components/AccountBook/AccountBookHistory";
import AccountBookAnalytics from "../components/AccountBook/AccountBookAnalytics";

export default function AccountBookPage() {
  return (
    <Section>
      <div className="container">
        <div className="grid">
          <div className="row__one">
            <AccountBookAnalytics />
          </div>
          <div className="row__two">
            <AccountBookHistory />
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  .grid {
    margin: 5vw 10vw;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    .row__one {
      display: grid;
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      height: 50%;
      gap: 1rem;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      margin: 0;
    }
  }
`;
