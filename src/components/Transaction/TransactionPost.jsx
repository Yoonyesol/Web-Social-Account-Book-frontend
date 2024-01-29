import React, { useState } from "react";
import styled from "styled-components";
import { postTransaction } from "../../utils/api";

const TransactionPost = ({ handleCancel }) => {
  const [form, setForm] = useState({
    type: null,
    category: "",
    title: "",
    amount: null,
    date: null,
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTransaction(form);
    alert("저장되었습니다!");
    onCancel();
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <Section>
      <div className="title">내역 추가</div>
      <form className="form" onSubmit={handleSubmit}>
        <div class="formItem">
          <label htmlFor="type">
            <input
              className="formInput"
              type="radio"
              name="type"
              value="지출"
              onChange={handleChange}
              required
              checked={form.type === "지출"}
            />
            지출
          </label>
          <label htmlFor="type">
            <input className="formInput" type="radio" name="type" value="수입" onChange={handleChange} />
            수입
          </label>
        </div>
        <div class="formItem">
          <label htmlFor="category">카테고리</label>
          <input
            className="formInput"
            required
            placeholder="카테고리를 입력해주세요"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div class="formItem">
          <label htmlFor="title">소비내역</label>
          <input
            className="formInput"
            required
            placeholder="소비내역을 입력해주세요"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div class="formItem">
          <label htmlFor="amount">금액</label>
          <input
            className="formInput"
            required
            placeholder="금액을 입력해주세요"
            type="number"
            min="1"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div class="formItem">
          <label htmlFor="date">날짜</label>
          <input
            className="formInput"
            required
            placeholder="금액을 입력해주세요"
            type="datetime-local"
            name="date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div class="formItem">
          <label htmlFor="memo">메모</label>
          <input
            className="formInput"
            placeholder="메모를 입력해주세요"
            type="text"
            name="memo"
            value={form.memo}
            onChange={handleChange}
          />
        </div>
        <div className="BtnContainer">
          <button className="SaveBtn" type="submit">
            저장
          </button>
          <button className="CancelBtn" onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </Section>
  );
};

export default TransactionPost;

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

  .formItem > input {
    font-size: 15px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
  }

  .formItem > select {
    font-size: 15px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
  }

  .formItem > select option {
    font-size: 15px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
  }

  .BtnContainer {
    display: flex;
    align-items: center;
  }

  .SaveBtn {
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
