import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionList from "../components/Transaction/TransactionList";
import TransactionAnalytics from "../components/Transaction/TransactionAnalytics";
import Header from "../common/Header";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../modules/transactions";
import { fetchTransactionsByUidAPI } from "../utils/transactionAPI";
import { RootState } from "../modules/rootReducer";
import { TransactionEntity, UserInfoType } from "../types";
import { themeStyle } from "../styles/Theme";

export default function Transactions() {
  const transactionList: TransactionEntity[] = useSelector((state: RootState) => state.transactions.transactions);
  const userInfo: UserInfoType = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState<TransactionEntity[]>([]);

  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };

  useEffect(() => {
    const fetchData = async () => {
      const uid = userInfo.userId;
      try {
        const transactions = await fetchTransactionsByUidAPI(uid);
        dispatch(getTransactions(transactions));
      } catch (error) {
        console.log("해당 유저의 입출금 내역을 찾을 수 없습니다:", error.message);
      }
    };
    fetchData();
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (transactionList.length >= 1) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();
      const filteredData = transactionList.filter((item) => firstDay <= item.date && item.date <= lastDay);
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
            <TransactionAnalytics curDate={curDate} />
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
  ${themeStyle}

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
    .container {
      margin: 0;
    }
  }

  @media (max-width: 450px) {
    padding: 1rem;
  }
`;
