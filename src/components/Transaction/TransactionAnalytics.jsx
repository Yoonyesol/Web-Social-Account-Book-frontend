import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStyleRealWhite } from "../../common/CardStyles";
import { FaPen } from "react-icons/fa";
import Modal from "../../common/Modal";
import BudgetEditor from "./BudgetEditor";
import { fetchBudgetAPI } from "../../utils/userAPI";
import { dateToYearMonthFormat } from "../../constants/function";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../../common/LoadingIndicator";
import { fetchMonthlyTransactionsAPI } from "../../utils/transactionAPI";
import { setBudget, setExpense, setIncome } from "../../modules/transactionAnalytics";

export default function TransactionAnalytics({ curDate }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.userId);
  const transactionList = useSelector((state) => state.transactions.transactions);
  const transactionAnalytics = useSelector((state) => state.transactionAnalytics);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const responseData = await fetchBudgetAPI(userId, dateToYearMonthFormat(curDate));
        dispatch(setBudget(responseData));
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const responseData = await fetchMonthlyTransactionsAPI(userId, dateToYearMonthFormat(curDate));
        dispatch(setIncome(responseData.income));
        dispatch(setExpense(responseData.expense));
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };

    fetchBudget();
    fetchMonthlyData();
  }, [curDate, userId, dispatch, transactionList]);

  function openModal() {
    setModalOn(true);
  }

  function handleCancel() {
    setModalOn(false);
  }

  if (!transactionAnalytics.budget) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      <div className="analytic budget">
        <div className="title-btn">
          <h4>예산</h4>
          <FaPen onClick={openModal} />
        </div>
        {modalOn && (
          <Modal visible={modalOn} closable={true} maskClosable={false} onClose={handleCancel}>
            <BudgetEditor closeEditor={handleCancel} curDate={curDate} budget={transactionAnalytics.budget} />
          </Modal>
        )}
        <h2>{transactionAnalytics.budget.amount.toLocaleString("ko-KR")}원</h2>
      </div>
      <div className="analytic income">
        <h4>수입</h4>
        <h2 style={{ color: "green" }}>{transactionAnalytics.income.toLocaleString("ko-KR")}원</h2>
      </div>
      <div className="analytic outcome">
        <h4>지출</h4>
        <h2 style={{ color: "#ec444c" }}>{transactionAnalytics.expense.toLocaleString("ko-KR")}원</h2>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
  transition: 0.5s ease-in-out;
  margin: 1rem 0;

  .analytic {
    ${cardStyleRealWhite}
    padding: 1rem 1.5rem 2rem 1.5rem;
    width: 100%;

    svg {
      cursor: pointer;
    }

    .title-btn {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    h2 {
      text-align: center;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
