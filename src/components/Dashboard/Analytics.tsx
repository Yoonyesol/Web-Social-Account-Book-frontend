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
import { RootState } from "../../modules/rootReducer";
import Colors from "../../styles/Colors";

export default function Analytics() {
  const userId: string = useSelector((state: RootState) => state.user.userInfo.userId);
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchBudgetAPI(userId, dateToYearMonthFormat(curDate));
        setBudget(responseData.amount);
      } catch (error) {
        console.log("해당 유저의 예산을 불러올 수 없습니다:", error.message);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const responseData = await fetchMonthlyTransactionsAPI(userId, dateToYearMonthFormat(curDate));
        setIncome(responseData.income);
        setExpense(responseData.expense);
      } catch (error) {
        console.log("해당 유저의 월별 데이터를 불러올 수 없습니다:", error.message);
      }
    };

    fetchData();
    fetchMonthlyData();
  }, [curDate, userId]);

  return (
    <AnalyticLayout>
      <AnalyticContainer>
        <div className="content">
          <h5>예산</h5>
          <h2>{budget.toLocaleString("ko-kr")}원</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </AnalyticContainer>
      <AnalyticContainer>
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>수입</h5>
          <h2>{income.toLocaleString("ko-KR")}원</h2>
        </div>
      </AnalyticContainer>
      <AnalyticContainer>
        <div className="content">
          <h5>지출</h5>
          <h2>{expense.toLocaleString("ko-KR")}원</h2>
        </div>
        <div className="logo">
          <IoStatsChart />
        </div>
      </AnalyticContainer>
      <AnalyticContainer>
        <div className="logo">
          <BiGroup />
        </div>
        <div className="content">
          <h5>친구 (Coming soon!)</h5>
          <h2>9명</h2>
        </div>
      </AnalyticContainer>
    </AnalyticLayout>
  );
}

const AnalyticLayout = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (min-width: 280px) and (max-width: 772px) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }
`;

const AnalyticContainer = styled.div`
  ${cardStyle};
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: ${Colors.DEEP_PURPLE};
    color: white;
    svg {
      color: ${Colors.DEEP_PURPLE};
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
`;
