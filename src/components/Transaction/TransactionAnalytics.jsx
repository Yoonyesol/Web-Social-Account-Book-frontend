import React, { useState } from "react";
import styled from "styled-components";
import { cardStylePurple } from "../../common/CardStyles";
import { FaPen } from "react-icons/fa";
import Modal from "../../common/Modal";
import BudgetForm from "./BudgetForm";

export default function TransactionPost() {
  const [budget, setBudget] = useState(300000);
  const [income, setIncome] = useState(190000);
  const [expense, setExpense] = useState(30000);

  const [modalOn, setModalOn] = useState(false);

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
        <h2>{budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
      </div>

      <div className="analytic income">
        <h4>수입</h4>
        <h2>{income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
      </div>
      <div className="analytic outcome">
        <h4>지출</h4>
        <h2>{expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
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
