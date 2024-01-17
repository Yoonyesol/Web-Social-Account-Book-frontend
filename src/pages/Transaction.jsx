import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionList from "../components/Transaction/TransactionList";
import AccountBookAnalytics from "../components/Transaction/TransactionAnalytics";
import Header from "../components/Transaction/Header";
import Button from "../common/Button";

export const transactionList = [
  {
    id: 1,
    date: 1705029633942,
    category: "교통/차량",
    description: "버스비",
    amount: -4000,
    type: "지출",
    memo: "버스비",
  },
  {
    id: 2,
    date: 1705129633942,
    category: "용돈",
    description: "용돈",
    amount: 12000,
    type: "수입",
    memo: "",
  },
  {
    id: 3,
    date: 1705229633942,
    category: "문화비",
    description: "서적구매",
    amount: -25000,
    type: "지출",
    memo: "컴퓨터공학입문서 구입",
  },
  {
    id: 4,
    date: 1709329633942,
    category: "식비",
    description: "외식비",
    amount: -52000,
    type: "지출",
    memo: "외식",
  },
  {
    id: 5,
    date: 1709329633942,
    category: "용돈",
    description: "엄마께 용돈",
    amount: 32000,
    type: "수입",
    memo: "엄마의 부업을 도와드리고 용돈을 받았다!",
  },
  {
    id: 6,
    date: 1709329633942,
    category: "용돈",
    description: "아빠께 용돈",
    amount: 42000,
    type: "수입",
    memo: "아빠의 서재 정리를 도와드리고 용돈을 받았다",
  },
];

export default function Transaction() {
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);

  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };

  useEffect(() => {
    if (transactionList.length >= 1) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();
      setData(transactionList.filter((item) => firstDay <= item.date && item.date <= lastDay));
    }
  }, [transactionList, curDate]);

  return (
    <Section>
      <div className="container">
        <Header
          text={dateText}
          leftChild={<Button text="◀" onClick={decreaseMonth} color="grey" />}
          rightChild={<Button text="▶" onClick={increaseMonth} color="grey" />}
        />
        <div className="transaction">
          <div className="analytics">
            <AccountBookAnalytics />
          </div>
          <div className="list">
            <TransactionList data={data} />
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  .container {
    margin: 0vw 15vw;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
  }

  .transaction {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .analytics {
      height: 50%;
    }
    .list {
      height: 50%;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .container {
      margin: 0;
    }
  }
`;
