import React from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { cardStyle } from "./common/CardStyles";

export default function CategoryExpense() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const pieData = [
    {
      name: "식비",
      value: 68.85,
    },
    {
      name: "교통비",
      value: 7.91,
    },
    {
      name: "생활비",
      value: 26.85,
    },
    {
      name: "문화비",
      value: 6.14,
    },
    {
      name: "기타",
      value: 10.25,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
  };

  return (
    <Section>
      <div className="title">
        <h2>카테고리별 지출</h2>
      </div>
      <div className="piechart">
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </div>

      <div className="comment">
        <h3>
          이번 주에는 <span h5>식비</span>에 가장 많은 지출을 하셨어요.
        </h3>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
      margin-bottom: 2rem;
    }
  }
  .piechart {
  }
  .comment {
    margin-top: 2rem;
    text-align: center;
    h3 {
      color: black;
      font-family: "Gowun Batang", serif;
    }
    span {
      color: red;
      font-family: "Gowun Batang", serif;
    }
  }
`;
