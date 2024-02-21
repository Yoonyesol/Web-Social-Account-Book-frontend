import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dateToYearMonthFormat } from "../../constants/function";
import Button from "../../common/Button";
import { editBudgetAPI } from "../../utils/userAPI";
import { setBudget } from "../../modules/transactionAnalytics";

const BudgetEditor = ({ closeEditor, curDate, budget }) => {
  const userId = useSelector((state) => state.user.userInfo.userId);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    uid: userId,
    id: budget._id,
    monthYear: dateToYearMonthFormat(curDate),
    amount: budget.amount,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBudget = await editBudgetAPI(form);
      dispatch(setBudget(updatedBudget));
      alert("저장되었습니다!");
      onCancel();
    } catch (err) {
      console.log("수정 진행 중 오류가 발생했습니다.", err.message);
    }
  };

  const onCancel = () => {
    closeEditor();
  };

  return (
    <Section>
      <h3>예산 수정</h3>
      <form className="form" onSubmit={onSubmit}>
        <div className="formItem">
          <label className="amount">예산</label>
          <input
            className="formInput"
            required
            type="number"
            name="amount"
            placeholder="예산을 입력해 주세요"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" text={"수정"} />
          <Button type="button" onClick={onCancel} text="취소" color="red" />
        </div>
      </form>
    </Section>
  );
};

export default BudgetEditor;

const Section = styled.section`
  .formItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2rem 0rem 1rem 0rem;
  }

  .formItem > label {
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 17px;
    font-family: "Gowun Batang", serif;
  }

  .formInput {
    font-size: 14px;
    padding: 0.25rem;
  }

  .formItem > input[type="date"] {
    font-family: "Montserrat", sans-serif;
    padding: 0.1rem;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;
