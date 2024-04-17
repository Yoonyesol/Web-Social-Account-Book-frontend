import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBudgetExpenseRatioAPI, fetchSimilarBudgetExpenseRatioAPI } from "../utils/challengeAPI";
import { dateToYearMonthFormat } from "../constants/function";
import { ChallengeTable } from "../components/Challenge/ChallengeTable";
import { cardStylePurple, cardStyleRealWhite } from "../common/CardStyles";
import { useSelector } from "react-redux";
import { fetchBudgetAPI } from "../utils/userAPI";
import { fetchMonthlyTransactionsAPI } from "../utils/transactionAPI";
import { RootState } from "../modules/rootReducer";

const date = dateToYearMonthFormat(new Date());

export default function ChallengePage() {
  const userId: string = useSelector((state: RootState) => state.user.userInfo.userId);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [similarData, setSimilarData] = useState([]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const responseData = await fetchBudgetAPI(userId, dateToYearMonthFormat(curDate));
        setBudget(responseData.amount !== null ? responseData.amount : 0);
      } catch (error) {
        console.log("해당 유저의 예산을 불러올 수 없습니다:", error.message);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const responseData = await fetchMonthlyTransactionsAPI(userId, dateToYearMonthFormat(curDate));
        setExpense(responseData.expense);
      } catch (error) {
        console.log("해당 유저의 월별 데이터를 불러올 수 없습니다:", error.message);
      }
    };

    fetchBudgetData();
    fetchMonthlyData();
  }, [curDate, userId]);

  useEffect(() => {
    const fetchRatioData = async () => {
      try {
        const responseData = await fetchBudgetExpenseRatioAPI(date);
        setData(responseData);
      } catch (error) {
        console.log("전체 챌린지 랭킹 API 호출 도중 에러 발생:", error.message);
      }
    };

    const fetchSimilarData = async () => {
      try {
        const responseData = await fetchSimilarBudgetExpenseRatioAPI(date, budget);
        setSimilarData(responseData);
      } catch (error) {
        console.log("예산별 챌린지 랭킹 API 호출 도중 에러 발생:", error.message);
      }
    };

    fetchRatioData();
    fetchSimilarData();
  }, [budget]);

  return (
    <Section>
      <div className="title">
        <h2>{date}월 실시간 소비 순위</h2>
        <span>✨예산 대비 지출이 적을수록 랭킹이 높아요!</span>
        <span>✨예산이 0원인 경우 유사범위 랭킹은 제공되지 않습니다. 예산을 등록해주세요!</span>
      </div>

      <Analytics>
        <div className="analytic budget">
          <h4>나의 예산</h4>
          <h2>{budget.toLocaleString("ko-KR")}원</h2>
        </div>
        <div className="analytic outcome">
          <h4>나의 지출</h4>
          <h2 style={{ color: "#ec444c" }}>{expense.toLocaleString("ko-KR")}원</h2>
        </div>
        <div className="analytic outcome-for-budget">
          <h4>예산 대비 지출</h4>
          <h2 style={{ color: "green" }}>{expense && budget ? (expense / budget).toFixed(4) : 0}</h2>
        </div>
      </Analytics>

      <div className="card">
        <h3>📊전체 랭킹</h3>
        <ChallengeTable data={data} />
      </div>

      <div className="card">
        <h3>📊유사 범위 예산 사용자 랭킹</h3>
        <div className="budget-width">
          {budget > 0 &&
            `${Math.max(0, budget * (1 - 0.1)).toLocaleString("ko-KR")}원 ~ ${(budget * (1 + 0.1)).toLocaleString(
              "ko-KR",
            )}원`}
        </div>
        <span className="description">* 예산 범위: ±10%</span>
        <ChallengeTable data={similarData} />
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 1.5rem 15rem;
  height: 100%;
  text-align: center;

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 2rem;

    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.2rem;
    }

    span {
      font-size: 0.9rem;
    }
  }

  .user-inform {
  }

  .card {
    ${cardStylePurple}
    padding:30px;
    margin-bottom: 1rem;

    .description {
      font-size: 0.75rem;
      color: #f5f3f3;
      margin: 10px 0;
      float: right;
    }

    .budget-width {
      margin-top: 0.3rem;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 600px) {
    padding: 1rem;
    .card {
      padding: 1rem;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 1300px) {
    padding: 1.5rem 5rem;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;

const Analytics = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
  transition: 0.5s ease-in-out;
  margin-bottom: 1rem;

  .analytic {
    ${cardStyleRealWhite}
    padding: 1rem 1.5rem 2rem 1.5rem;
    width: 100%;
    text-align: start;

    h2 {
      margin-top: 0.3rem;
      text-align: center;
    }
  }

  @media (max-width: 450px) {
    font-size: 80%;
  }

  @media screen and (min-width: 280px) and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .analytic {
      ${cardStyleRealWhite}
      padding: 1rem 1.5rem 2rem 1.5rem;
      width: 100%;
    }
  }
`;
