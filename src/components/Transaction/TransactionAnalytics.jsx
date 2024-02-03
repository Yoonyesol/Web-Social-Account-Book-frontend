import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStylePurple } from "../../common/CardStyles";
import { FaPen } from "react-icons/fa";
import Modal from "../../common/Modal";
import BudgetForm from "./BudgetForm";

export default function TransactionPost({ data }) {
  const [budget, setBudget] = useState(30000);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    if (data) {
      const totalExpense = data
        .filter((transaction) => transaction.transaction_type === false)
        .reduce((total, transaction) => parseInt(total) + parseInt(transaction.amount), 0);

      const totalIncome = data
        .filter((transaction) => transaction.transaction_type === true)
        .reduce((total, transaction) => parseInt(total) + parseInt(transaction.amount), 0);

      setIncome(totalIncome);
      setExpense(totalExpense);
    }
  }, [data]);

  const handleSave = (data) => {
    setBudget(data.budget);
    handleCancel();
  };

  function openModal() {
    setModalOn(true);
  }

  function handleCancel() {
    setModalOn(false);
  }

  return (
    <Section>
      <div className="analytic budget">
        <h4>
          예산
          <FaPen onClick={openModal} />
        </h4>
        {modalOn && (
          <Modal visible={modalOn} closable={true} maskClosable={false} onClose={handleCancel}>
            <BudgetForm onSaveData={handleSave} handleCancel={handleCancel} />
          </Modal>
        )}
        <h2>{budget.toLocaleString("ko-KR")}원</h2>
      </div>
      <div className="analytic income">
        <h4>수입</h4>
        <h2>{income.toLocaleString("ko-KR")}원</h2>
      </div>
      <div className="analytic outcome">
        <h4>지출</h4>
        <h2>{expense.toLocaleString("ko-KR")}원</h2>
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
    ${cardStylePurple}
    padding: 1rem 1.5rem;
    width: 90%;

    svg {
      cursor: pointer;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
