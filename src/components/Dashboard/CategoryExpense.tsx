import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";
import { cardStyle } from "../../common/CardStyles";
import { fetchExpensesCategoryAPI } from "../../utils/transactionAPI";
import { StoreData } from "../../interfaces/StoreData";

const COLORS = ["#0088FE", "#F75C82", "#FFBB28", "#00C49F", "#FF8042", "#AF19FF"];

const CustomTooltip = ({ active, payload }) => {
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

interface ExpensesCategory {
  category: string;
  ratio: number;
}

export default function CategoryExpense() {
  const uid: string = useSelector((state: StoreData) => state.user.userInfo.userId);
  const [data, setData] = useState<ExpensesCategory[]>([]);
  const [chartSize, setChartSize] = useState(300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchExpensesCategoryAPI(uid);
        setData(responseData);
      } catch (error) {
        console.log("카테고리별 지출 API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth <= 445 ? 150 : 300; // 창 크기에 따라 너비 조절
      setChartSize(newSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Section>
      <div className="title">
        <h2>카테고리별 지출</h2>
      </div>
      {data.length ? (
        <>
          <div className="piechart">
            <PieChart width={chartSize} height={chartSize}>
              <Pie
                data={data}
                color="#000000"
                dataKey="ratio"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius="100%"
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
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
    margin-bottom: 2rem;
    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
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
