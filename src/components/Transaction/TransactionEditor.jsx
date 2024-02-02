import React, { useState } from "react";
import styled from "styled-components";
import { editTransactionAPI, postTransactionAPI } from "../../utils/api";
import { addTransaction, editTransaction } from "../../modules/transactions";
import { useDispatch } from "react-redux";

export default function TransactionEditor({ isEdit, selectedData, closeEditor }) {
  const dispatch = useDispatch();
  //추가
  const [form, setForm] = useState({
    type: "지출",
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
    setForm({
      ...form,
      [name]: value,
    });
  };

  //수정
  const onEditChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value,
    });
  };

  //추가(POST)
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await postTransactionAPI(form);
      dispatch(addTransaction(form));
      alert("저장되었습니다!");
      onCancel();
    } catch (err) {
      console.log("post 진행 중 오류가 발생했습니다.", err.message);
    }
  };

  //수정(PATCH)
  const onSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await editTransactionAPI(edited);
      dispatch(editTransaction(edited));
      alert("수정되었습니다!");
      onCancel();
    } catch (err) {
      console.log("수정 중 오류가 발생했습니다.", err.message);
    }
  };

  const onCancel = () => {
    closeEditor();
  };

  return (
    <Section>
      <h3 className="title">{isEdit ? "내역 수정" : "내역 추가"}</h3>
      <form className="form" onSubmit={isEdit ? onSubmitEdit : onSubmit}>
        <div className="formItem">
          <label className="type">
            <input
              className="formInput"
              type="radio"
              name="type"
              value="지출"
              onChange={isEdit ? onEditChange : handleChange}
              checked={isEdit ? "지출" === edited.type : "지출" === form.type}
            />
            지출
          </label>
          <label className="type">
            <input
              className="formInput"
              type="radio"
              name="type"
              value="수입"
              onChange={isEdit ? onEditChange : handleChange}
              checked={isEdit ? "수입" === edited.type : "수입" === form.type}
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
        <div className="BtnContainer">
          {isEdit ? (
            <button type="submit" className="EditBtn">
              수정
            </button>
          ) : (
            <button type="submit" className="SaveBtn">
              저장
            </button>
          )}
          <button className="CancelBtn" onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </Section>
  );
}

const Section = styled.section`
  .formItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2rem 0rem 1rem 0rem;
  }

  .formItem > label {
    margin-bottom: 5px;
    font-size: 20px;
    font-family: "Gowun Batang", serif;
  }

  .formInput,
  .formItem > textarea[type="text"] {
    font-size: 17px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
  }

  .SaveBtn,
  .EditBtn {
    margin-right: 1rem;
    background-color: #5d8de6;
    padding: 0.5rem 2rem;
    font-size: 1rem;
    font-family: "Gowun Batang", serif;
    color: white;
    border-radius: 0.5rem;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .CancelBtn {
    margin-right: 1rem;
    background-color: #f75c82;
    padding: 0.5rem 2rem;
    font-size: 1rem;
    font-family: "Gowun Batang", serif;
    color: white;
    border-radius: 0.5rem;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;
