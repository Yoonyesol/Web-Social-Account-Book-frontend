import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { cardStyle } from "../../common/CardStyles";
import { fetchExpensesCategoryAPI } from "../../utils/transactionAPI";
import { useSelector } from "react-redux";
const COLORS = ["#0088FE", "#F75C82", "#FFBB28", "#00C49F", "#FF8042", "#AF19FF"];

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
        <label>{`${payload[0].name} : ${payload[0].value.toFixed(2)}%`}</label>
      </div>
    );
  }
};

export default function CategoryExpense() {
  const uid = useSelector((state) => state.user.userInfo.userId);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchExpensesCategoryAPI(uid);
        setData(responseData);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, [uid]);

  return (
    <Section>
      <div className="title">
        <h2>카테고리별 지출</h2>
      </div>
      {data.length ? (
        <>
          <div className="piechart">
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                color="#000000"
                dataKey="ratio"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </div>
          <div className="comment">
            <h3>
              이번 달에는 <span>{data.length ? data[0].category : ""}</span>에 가장 많은 지출을 하셨어요.
            </h3>
          </div>
        </>
      ) : (
        <div className="comment">
          <h3>지출 내역이 존재하지 않습니다.</h3>
        </div>
      )}
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

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .title {
      h2 {
        margin-bottom: 0;
      }
    }

    .comment {
      margin: 2rem 0;
    }
  }
`;
