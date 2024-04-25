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
import { RootState } from "../../modules/rootReducer";
import { TransactionAnalyticsEntity, TransactionEntity } from "../../types";
import Colors from "../../styles/Colors";

export default function TransactionAnalytics({ curDate }) {
  let remainBudget: number;
  const dispatch = useDispatch();
  const transactionList: TransactionEntity[] = useSelector((state: RootState) => state.transactions.transactions);
  const userId: string = useSelector((state: RootState) => state.user.userInfo.userId);
  const transactionAnalytics: TransactionAnalyticsEntity = useSelector(
    (state: RootState) => state.transactionAnalytics,
  );
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const responseData = await fetchBudgetAPI(userId, dateToYearMonthFormat(curDate));
        dispatch(setBudget(responseData));
      } catch (error) {
        console.log("월별 예산을 가져오는 API 호출 도중 에러 발생:", error.message);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const responseData = await fetchMonthlyTransactionsAPI(userId, dateToYearMonthFormat(curDate));
        dispatch(setIncome(responseData.income));
        dispatch(setExpense(responseData.expense));
      } catch (error) {
        console.log("월별 소비/지출을 가져오는 API 호출 도중 에러 발생:", error.message);
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
  } else {
    remainBudget = transactionAnalytics.budget.amount - transactionAnalytics.expense;
  }

  return (
    <Analytics remainBudget={remainBudget}>
      <div className="analytic budget">
        <div className="title-btn">
          <h4>예산</h4>
          <FaPen onClick={openModal} />
        </div>
        {modalOn && (
          <Modal visible={modalOn}>
            <BudgetEditor closeEditor={handleCancel} curDate={curDate} budget={transactionAnalytics.budget} />
          </Modal>
        )}
        <div className="budget-content">
          <h2>{transactionAnalytics.budget.amount.toLocaleString("ko-KR")}원</h2>
          <span>
            {transactionAnalytics.budget.amount !== 0
              ? remainBudget < 0
                ? `${remainBudget * -1}원 초과`
                : `${remainBudget}원 남음`
              : ""}
          </span>
        </div>
      </div>
      <div className="analytic income">
        <h4>수입</h4>
        <h2 style={{ color: "green" }}>{transactionAnalytics.income.toLocaleString("ko-KR")}원</h2>
      </div>
      <div className="analytic outcome">
        <h4>지출</h4>
        <h2 style={{ color: `${Colors.RED}` }}>{transactionAnalytics.expense.toLocaleString("ko-KR")}원</h2>
      </div>
    </Analytics>
  );
}

const Analytics = styled.section<{ remainBudget: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
  transition: 0.5s ease-in-out;
  margin: 1rem 0;

  .analytic {
    ${cardStyleRealWhite}
    padding: 1rem 1.5rem 1.5rem 1.5rem;
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

    .budget-content {
      text-align: center;

      span {
        font-size: 0.75rem;
        color: ${(props) => (props.remainBudget < 0 ? `${Colors.RED}` : `${Colors.BLUE}`)};
      }
    }
  }

  @media (max-width: 450px) {
    font-size: 80%;
  }

  @media screen and (min-width: 280px) and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;

    .analytic {
      ${cardStyleRealWhite}
      padding: 1rem 1.5rem 2rem 1.5rem;
      width: 100%;
    }
  }
`;
