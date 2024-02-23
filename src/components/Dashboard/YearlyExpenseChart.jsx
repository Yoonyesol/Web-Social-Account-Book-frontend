import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { cardStyle } from "../../common/CardStyles";
import { fetchLatestExpensesAPI } from "../../utils/transactionAPI";
import { useSelector } from "react-redux";

const calculateExpenseChangeRate = (previousMonthExpense, currentMonthExpense) => {
  if (previousMonthExpense === 0) {
    return 100;
  }
  const changeRate = ((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100;

  return changeRate.toFixed(2);
};

export default function YearlyExpenseChart() {
  const [data, setData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseChangeRate, setExpenseChangeRate] = useState(0);
  const uid = useSelector((state) => state.user.userInfo.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchLatestExpensesAPI(uid);
        setData(responseData.monthlyExpenses);
        setTotalExpense(responseData.totalYearlyExpense);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    if (data.length) {
      setExpenseChangeRate(calculateExpenseChangeRate(data[10].total, data[11].total));
    }
  }, [data]);

  return (
    <Section>
      <div className="top">
        <div className="info">
          <h4>최근 1년 지출</h4>
          <h1>{totalExpense.toLocaleString("ko-kr")}원</h1>
          <h5>전월 대비 지출 증감 ({new Date().getMonth() + 1}월)</h5>
          <div className="growth">
            <span>{expenseChangeRate}%</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart width={500} height={400} data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Tooltip />
            <XAxis dataKey="month" />
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="total"
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
        margin-bottom: 1rem;
      }
      h5 {
        margin-bottom: 0.3rem;
      }
      .growth {
        background-color: #6c5a74;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #8b8fc8;
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
    .AreaChart {
      /* width: 200; */
    }
  }
`;
