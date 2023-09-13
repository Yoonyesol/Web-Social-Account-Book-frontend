import React from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { cardStyle } from "./CardStyles";

const userData = [
  {
    name: "Jan",
    Expense: 1453700,
  },
  {
    name: "Feb",
    Expense: 5640000,
  },
  {
    name: "Mar",
    Expense: 1636000,
  },
  {
    name: "Apr",
    Expense: 1339290,
  },
  {
    name: "May",
    Expense: 2980000,
  },
  {
    name: "Jun",
    Expense: 1670000,
  },
  {
    name: "Jul",
    Expense: 100000,
  },
  {
    name: "Aug",
    Expense: 3738000,
  },
  {
    name: "Sep",
    Expense: 335000,
  },
  {
    name: "Oct",
    Expense: 6407000,
  },
];
export default function EarningPieChart() {
  return (
    <Section>
      <div className="top">
        <div className="info">
          <h4>1년 지출</h4>
          <h1>3,032,926원</h1>
          <div className="growth">
            <span>+2.34%</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart width={500} height={400} data={userData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Tooltip />
            <XAxis dataKey="name" />
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="Expense"
              stroke="#3c76e0"
              fill="purple"
              strokeWidth={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyle}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #6c5a74;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #3c76e0;
          span {
            color: white;
          }
        }
        span {
          color: white;
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: white !important;
      border-color: white !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
