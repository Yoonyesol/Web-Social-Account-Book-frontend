import React, { useState } from "react";
import styled from "styled-components";
import { editTransactionAPI, postTransactionAPI } from "../../utils/transactionAPI";
import { addTransaction, editTransaction } from "../../modules/transactions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/Button";

export default function TransactionEditor({ isEdit, selectedData, closeEditor }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.userId);
  const token = useSelector((state) => state.user.token);

  //추가
  const [form, setForm] = useState({
    uid: userId,
    transaction_type: false,
    category: "",
    title: "",
    amount: null,
    date: new Date().getTime(),
    memo: "",
  });
  //수정
  const [edited, setEdited] = useState(selectedData);

  //추가
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //수정
  const onEditChange = (e) => {
    const { name, value } = e.target;
    setEdited((prevEdited) => ({
      ...prevEdited,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  //추가(POST)
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const transaction = await postTransactionAPI(form, token);
      dispatch(addTransaction(transaction));
      alert("저장되었습니다!");
      onCancel();
    } catch (err) {
      alert("가계부 내역 등록 중 오류가 발생했습니다.", err.message);
    }
  };

  //수정(PATCH)
  const onSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const transaction = await editTransactionAPI(edited, token);
      dispatch(editTransaction(transaction));
      alert("수정되었습니다!");
      onCancel();
    } catch (err) {
      alert("가계부 내역 수정 중 오류가 발생했습니다.", err.message);
    }
  };

  const onCancel = () => {
    closeEditor();
  };

  return (
    <Section>
      <h2 className="title">{isEdit ? "내역 수정" : "내역 추가"}</h2>
      <form className="form" onSubmit={isEdit ? onSubmitEdit : onSubmit}>
        <div className="formItem">
          <label className="transaction_type">
            <input
              className="formInput"
              type="radio"
              name="transaction_type"
              value="false"
              onChange={isEdit ? onEditChange : handleChange}
              checked={
                isEdit ? edited.transaction_type.toString() === "false" : form.transaction_type.toString() === "false"
              }
            />
            지출
          </label>
          <label className="transaction_type">
            <input
              className="formInput"
              type="radio"
              name="transaction_type"
              value="true"
              onChange={isEdit ? onEditChange : handleChange}
              checked={
                isEdit ? edited.transaction_type.toString() === "true" : form.transaction_type.toString() === "true"
              }
            />
            수입
          </label>
        </div>
        <div className="formItem">
          <label className="category">카테고리</label>
          <input
            className="formInput"
            required
            placeholder="카테고리를 입력해주세요"
            type="text"
            name="category"
            value={isEdit ? edited.category : form.category}
            onChange={isEdit ? onEditChange : handleChange}
          />
        </div>
        <div className="formItem">
          <label className="title">거래처</label>
          <input
            className="formInput"
            required
            placeholder="거래처를 입력해주세요"
            type="text"
            name="title"
            value={isEdit ? edited.title : form.title}
            onChange={isEdit ? onEditChange : handleChange}
          />
        </div>
        <div className="formItem">
          <label className="amount">금액</label>
          <input
            className="formInput"
            required
            placeholder="금액을 입력해주세요"
            type="number"
            name="amount"
            min="0"
            value={isEdit ? edited.amount : form.amount}
            onChange={isEdit ? onEditChange : handleChange}
          />
        </div>
        <div className="formItem">
          <label className="date">날짜</label>
          <input
            className="formInput"
            required
            type="date"
            name="date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={
              isEdit ? new Date(edited.date).toISOString().slice(0, 10) : new Date(form.date).toISOString().slice(0, 10)
            }
            onChange={isEdit ? onEditChange : handleChange}
          />
        </div>
        <div className="formItem">
          <label className="memo">메모</label>
          <input
            className="formInput"
            placeholder="메모를 입력해주세요"
            type="text"
            name="memo"
            value={isEdit ? edited.memo : form.memo}
            onChange={isEdit ? onEditChange : handleChange}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" text={isEdit ? "수정" : "저장"} />
          <Button type="button" onClick={onCancel} text="취소" color="red" />
        </div>
      </form>
    </Section>
  );
}

const Section = styled.section`
  .title {
    color: #3c76e0;
    font-family: "Gowun Batang", serif;
    letter-spacing: 0.3rem;
  }

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

  .formInput,
  .formItem > textarea[type="text"] {
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
