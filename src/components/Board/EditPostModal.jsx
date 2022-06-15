import React, { useState } from "react";
import styled from "styled-components";

const EditPostModal = ({ selectedData, handleCancel, handleEditSubmit, userInfo }) => {
  //상위 컴포넌트에서 가져온 데이터 set
  const [edited, setEdited] = useState(selectedData);

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
        <h3>글 수정</h3>
        <form action="/api/v1/posts" className="form" onSubmit={onSubmitEdit}>
          <div class="formItem">
            <label htmlFor="author">작성자</label>
            <input
              className="formInput"
              type="text"
              name="author"
              value={edited.author}
              onChange={onEditChange}
              disabled
            />
          </div>
          <div class="formItem">
            <label htmlFor="title">제목</label>
            <input className="formInput" type="text" name="title" value={edited.title} onChange={onEditChange} />
          </div>
          <div class="formItem">
            <label htmlFor="content">내용</label>
            <textarea className="formArea" type="text" name="content" value={edited.content} onChange={onEditChange} />
          </div>
          <div class="formItem">
            <label htmlFor="lastedit">최종 수정일 </label>
            <input
              className="formInput"
              type="text"
              name="lastedit"
              value={edited.lastedit}
              onChange={onEditChange}
              disabled
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

export default EditPostModal;

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

  .formItem > input[type="text"],
  .formItem > textarea[type="text"] {
    font-size: 17px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
  }

  .formInput {
    width: 100%;
    height: 30px;
    border-radius: 0.25rem;
  }

  .formArea {
    width: 100%;
    height: 300px;
    border-radius: 0.25rem;
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
