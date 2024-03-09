import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBudgetExpenseRatioAPI, fetchSimilarBudgetExpenseRatioAPI } from "../utils/challengeAPI";
import { dateToYearMonthFormat } from "../constants/function";
import { ChallengeTable } from "../components/Challenge/ChallengeTable";
import { cardStylePurple } from "../common/CardStyles";
import { useSelector } from "react-redux";

const date = dateToYearMonthFormat(new Date());

export default function ChallengePage() {
  const [data, setData] = useState([]);
  const [similarData, setSimilarData] = useState([]);

  const uid = useSelector((state) => state.user.userInfo.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchBudgetExpenseRatioAPI(date);
        setData(responseData);
      } catch (error) {
        console.log("전체 챌린지 랭킹 API 호출 도중 에러 발생:", error.message);
      }
    };

    const fetchSimilarData = async () => {
      try {
        const responseData = await fetchSimilarBudgetExpenseRatioAPI(uid, date);
        setSimilarData(responseData);
      } catch (error) {
        console.log("예산별 챌린지 랭킹 API 호출 도중 에러 발생:", error.message);
      }
    };

    fetchData();
    fetchSimilarData();
  }, [uid]);

  return (
    <Section>
      <div className="title">
        <h2>{date}월 실시간 소비 순위</h2>
        <span>✨예산 대비 지출이 적을수록 랭킹이 높아요!</span>
      </div>

      <div className="card">
        <h3>📊전체 랭킹</h3>
        <ChallengeTable data={data} />
      </div>

      <div className="card">
        <h3>📊유사 범위 예산 사용자 랭킹</h3>
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

  .card {
    ${cardStylePurple}
    padding:30px;
    margin-bottom: 30px;

    .description {
      font-size: 0.75rem;
      color: #f5f3f3;
      margin: 10px 0;
      float: right;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 600px) {
    padding: 1.5rem;
    .card {
      padding: 20px;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 1300px) {
    padding: 1.5rem 5rem;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;
