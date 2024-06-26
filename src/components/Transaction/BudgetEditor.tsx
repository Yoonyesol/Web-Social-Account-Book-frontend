import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dateToYearMonthFormat } from "../../constants/function";
import Button from "../../common/Button";
import { editBudgetAPI } from "../../utils/userAPI";
import { setBudget } from "../../modules/transactionAnalytics";
import { RootState } from "../../modules/rootReducer";
import Colors from "../../styles/Colors";

const BudgetEditor = ({ closeEditor, curDate, budget }) => {
  const userId: string = useSelector((state: RootState) => state.user.userInfo.userId);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    uid: userId,
    id: budget._id,
    monthYear: dateToYearMonthFormat(curDate),
    amount: budget.amount,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedBudget = await editBudgetAPI(form);
      dispatch(setBudget(updatedBudget));
      alert("저장되었습니다!");
      onCancel();
    } catch (err) {
      alert("수정 진행 중 오류가 발생했습니다." + err.message);
    }
  };

  const onCancel = () => {
    closeEditor();
  };

  return (
    <Section>
      <h2 className="title">예산 수정</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="formItem">
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
          <Button type="submit" text="수정" />
          <Button type="button" onClick={onCancel} text="취소" color="red" />
        </div>
      </form>
    </Section>
  );
};

export default BudgetEditor;

const Section = styled.section`
  .title {
    color: ${Colors.BLUE};
    font-family: "Gowun Batang", serif;
    letter-spacing: 0.3rem;
  }

  .formItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2rem 0rem 1rem 0rem;
  }

  .formInput {
    font-size: 14px;
    padding: 0.25rem;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;
