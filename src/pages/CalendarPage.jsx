import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarPage() {
  return (
    <Section>
      <CalendarContainer>
        <FullCalendar
          aspectRatio="7"
          contentHeight="600px"
          defaultView="dayGridMonth"
          height="500px"
          plugins={[dayGridPlugin]}
        />
      </CalendarContainer>
    </Section>
  );
}

const CalendarContainer = styled.div`
  .fc td {
    background: white;
  }
`;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;
