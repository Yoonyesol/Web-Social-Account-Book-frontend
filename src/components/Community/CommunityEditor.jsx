import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommunityEditor = ({ isEdit, onSaveData, selectedData, handleCancel, handleEditSubmit }) => {
  const nav = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [edited, setEdited] = useState(selectedData);

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

  const onCancel = () => {
    handleCancel();
  };

  const onEditChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    if (edited.author === userInfo.name) {
      alert("수정되었습니다!");
      handleEditSubmit(edited);
    } else {
      alert("수정권한이 없습니다!");
    }
  };

  return (
    <Section>
      <div className="container">
        <h3>{isEdit ? "글 수정" : "게시글 등록"}</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formItem">
            <label className="writer">작성자</label>
            <input
              className="formInput"
              type="text"
              name="writer"
              value={isEdit ? edited.writer : "작성자"}
              onChange={isEdit && onEditChange}
              disabled
            />
          </div>
          <div className="formItem">
            <label className="title">제목</label>
            <input
              className="formInput"
              required
              placeholder="제목을 입력해주세요."
              type="text"
              name="title"
              value={isEdit ? edited.title : form.title}
              onChange={isEdit && onEditChange}
            />
          </div>
          {isEdit && (
            <div class="formItem">
              <label className="date">최종 수정일 </label>
              <input
                className="formInput"
                type="text"
                name="date"
                value={edited.date}
                onChange={onEditChange}
                disabled
              />
            </div>
          )}
          <div className="formItem">
            <label className="content">내용</label>
            <textarea
              className="formArea"
              required
              placeholder="내용을 입력해주세요"
              type="text"
              name="content"
              value={isEdit ? edited.content : form.content}
              onChange={isEdit && onEditChange}
            />
          </div>
          <div className="btnContainer">
            <Button type="submit" text="작성" />
            <Button type="button" onClick={() => nav(-1, { replace: true })} text="목록" color="red" />
            {isEdit && (
              <div className="BtnContainer">
                <button type="submit" className="EditBtn" onClick={onSubmitEdit}>
                  수정
                </button>
                <button className="CancelBtn" onClick={onCancel}>
                  취소
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
};

export default CommunityEditor;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  .container {
    margin: 20px auto;
    gap: 1.5rem;
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 10px;

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

  .formItem > input,
  .formItem > textarea {
    font-size: 15px;
    font-family: "Gowun Batang", serif;
  }

  .formInput {
    width: 35vw;
    height: 30px;
    border-radius: 0.25rem;
  }

  .formArea {
    width: 35vw;
    height: 400px;
    border-radius: 0.25rem;
  }

  .btnContainer {
    float: right;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;

    .formInput {
      width: 65vw;
    }

    .formArea {
      width: 65vw;
      height: 300px;
    }
  }
`;
