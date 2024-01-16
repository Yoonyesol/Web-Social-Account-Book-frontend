import React, { useState } from "react";
import styled from "styled-components";
import { cardStyleWhite } from "../../common/CardStyles";
import Button from "../../common/Button";

const Post = ({ onSaveData }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //페이지 이동 방지
    onSaveData(form);
    console.log(form);
    setForm({
      title: "",
      content: "",
    });
    alert("저장되었습니다!");
  };

  return (
    <Section>
      <div className="container">
        <h3>게시글 등록</h3>
        <form action="/api/v1/posts" className="form" onSubmit={handleSubmit}>
          <div className="formItem">
            <label htmlFor="title">제목</label>
            <input
              className="formInput"
              required
              placeholder="제목을 입력해주세요."
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="formItem">
            <label htmlFor="content">내용</label>
            <textarea
              className="formArea"
              required
              placeholder="내용을 입력해주세요"
              type="text"
              name="content"
              value={form.content}
              onChange={handleChange}
            />
          </div>
          <div className="btnContainer">
            <Button type="submit" text="작성"></Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Post;

const Section = styled.section`
  .container {
    ${cardStyleWhite}
    margin-top: 6rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

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

  .formItem > input::placeholder,
  .formItem > textarea::placeholder {
    font-size: 15px;
    font-family: "Gowun Batang", serif;
  }

  .formInput {
    border: none;
    width: 35vw;
    height: 30px;
    border-radius: 0.25rem;
  }

  .formArea {
    border: none;
    width: 35vw;
    height: 400px;
    border-radius: 0.25rem;
  }

  .btnContainer {
    float: right;
    /* margin-right: 1rem; */
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .formInput {
      width: 65vw;
    }

    .formArea {
      width: 65vw;
      height: 300px;
    }
  }
`;
