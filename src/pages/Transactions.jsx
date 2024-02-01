import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionList from "../components/Transaction/TransactionList";
import AccountBookAnalytics from "../components/Transaction/TransactionAnalytics";
import Header from "../components/Transaction/Header";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTransactions } from "../modules/transactions";
import { fetchTransactionsByUid } from "../utils/api";

export default function Transactions() {
  const transactionList = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
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
    const fetchData = async () => {
      const uid = "u1";
      try {
        const transactions = await fetchTransactionsByUid(uid);
        dispatch(getTransactions(transactions));
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (transactionList.length >= 1) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();
      const filteredData = transactionList.filter(
        (item) => firstDay <= new Date(item.date).getTime() && new Date(item.date).getTime() <= lastDay,
      );
      setData(filteredData);
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
