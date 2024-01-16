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
      <div className="analytic">
        <div className="content">
          <h5>
            예산
            <FaPen onClick={openModal} />
          </h5>
          {modalOn && (
            <Modal visible={modalOn} closable={true} maskClosable={false} onClose={handleCancel}>
              <BudgetForm onSaveData={handleSave} handleCancel={handleCancel} />
            </Modal>
          )}
          <h2>{budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="content">
          <h5>수입</h5>
          <h2>{income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="content">
          <h5>지출</h5>
          <h2>{expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h2>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  justify-content: space-between;
  .analytic {
    ${cardStylePurple}
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.5s ease-in-out;
    margin-bottom: 1rem;

    svg {
      cursor: pointer;
    }
  }
`;
