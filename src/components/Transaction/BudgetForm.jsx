import React, { useState } from "react";
import styled from "styled-components";

const BudgetForm = ({ onSaveData, handleCancel }) => {
  const [form, setForm] = useState({
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(form);
    console.log(form);
    setForm({
      budget: "",
    });
    // axios
    //   .post("http://localhost:5000/api/users/login", body)
    //   .then((res) => console.log(res));
    alert("저장되었습니다!");
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <Section>
      <div className="container">
        <h3>예산 수정</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div class="formItem">
            <label htmlFor="budget">예산</label>
            <input
              className="formInput"
              required
              type="number"
              name="budget"
              placeholder="예산을 입력해 주세요"
              value={form.budget}
              onChange={handleChange}
            />
          </div>
          <div className="BtnContainer">
            <button type="submit" className="EditBtn">
              수정
            </button>
            <button className="CancelBtn" onClick={onCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default BudgetForm;

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

  .BtnContainer {
    display: flex;
    align-items: center;
  }

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
