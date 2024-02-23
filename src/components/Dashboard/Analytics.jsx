import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStyle } from "../../common/CardStyles";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { useSelector } from "react-redux";
import { fetchBudgetAPI } from "../../utils/userAPI";
import { dateToYearMonthFormat } from "../../constants/function";
import { fetchMonthlyTransactionsAPI } from "../../utils/transactionAPI";

export default function Analytics() {
  const userId = useSelector((state) => state.user.userInfo.userId);
  const transactionAnalytics = useSelector((state) => state.transactionAnalytics);
  const [budget, setBudget] = useState({ amount: 0 });
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    if (!transactionAnalytics.budget.id) {
      const fetchData = async () => {
        try {
          const responseData = await fetchBudgetAPI(userId, dateToYearMonthFormat(curDate));
          setBudget(responseData.amount);
        } catch (error) {
          console.log("API 호출 도중 에러 발생:", error.message);
        }
      };

      const fetchMonthlyData = async () => {
        try {
          const responseData = await fetchMonthlyTransactionsAPI(userId, dateToYearMonthFormat(curDate));
          setIncome(responseData.income);
          setExpense(responseData.expense);
        } catch (error) {
          console.log("API 호출 도중 에러 발생:", error.message);
        }
      };

      fetchData();
      fetchMonthlyData();
    } else {
      setBudget(transactionAnalytics.budget.amount);
      setIncome(transactionAnalytics.income);
      setExpense(transactionAnalytics.expense);
    }
  }, [curDate, userId, transactionAnalytics]);

  return (
    <Section>
      <div className="analytic">
        <div className="content">
          <h5>예산</h5>
          <h2>{budget.toLocaleString("ko-kr")}원</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>수입</h5>
          <h2>{income.toLocaleString("ko-KR")}원</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="content">
          <h5>지출</h5>
          <h2>{expense.toLocaleString("ko-KR")}원</h2>
        </div>
        <div className="logo">
          <IoStatsChart />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <BiGroup />
        </div>
        <div className="content">
          <h5>친구</h5>
          <h2>9명</h2>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyle};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #6c5a74;
      color: white;
      svg {
        color: #6c5a74;
      }
    }
    .logo {
      background-color: white;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    /* .analytic {
      &:nth-of-type(1),
      &:nth-of-type(2) {
        flex-direction: row-reverse;
      }
    } */
  }
`;
