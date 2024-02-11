import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ControlOption from "../../common/ControlOption";
import { categoryOption } from "../../constants/constant";
import { createPostAPI } from "../../utils/communityAPI";
import { setDate } from "../../constants/function";
import LoadingIndicator from "../../common/LoadingIndicator";

const CommunityEditor = () => {
  const nav = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isEdit, setIsEdit] = useState(location.state === null ? false : true);
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState({ ...location.state });
  const [selectedCategory, setSelectedCategory] = useState(categoryOption[0].value);

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEdit === true) {
      setEditedData({
        ...editedData,
        [name]: value,
        writer: userInfo._id,
        category: selectedCategory,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
        writer: userInfo._id,
        category: selectedCategory,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createPostAPI(form);
      setIsLoading(false);
      alert("저장되었습니다!");
      nav(-1, { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.log("post 진행 중 오류가 발생했습니다.", error.message);
    }
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    if (editedData.writer.id === userInfo._id) {
      alert("수정되었습니다!");
      // handleEditSubmit(editedData);
    } else {
      alert("수정권한이 없습니다!");
    }
  };

  return (
    <Section>
      {isLoading && <LoadingIndicator />}
      <div className="container">
        <h3>{isEdit ? "글 수정" : "게시글 등록"}</h3>
        <form className="form" onSubmit={onSubmit}>
          <div className="formItem">
            <label className="writer">작성자</label>
            <input className="formInput" type="text" name="writer" value={userInfo.name} onChange={handleChange} />
          </div>
          <div className="formItem">
            <label className="category">카테고리</label>
            <ControlOption value={selectedCategory} chooseOption={setSelectedCategory} optionList={categoryOption} />
          </div>
          <div className="formItem">
            <label className="title">제목</label>
            <input
              className="formInput"
              required
              placeholder="제목을 입력해주세요."
              type="text"
              name="title"
              value={isEdit ? editedData.title : form.title}
              onChange={handleChange}
            />
          </div>
          {isEdit && (
            <div class="formItem">
              <label className="date">최종 수정일 </label>
              <input
                className="formInput"
                type="text"
                name="date"
                value={setDate(new Date(), true)}
                onChange={handleChange}
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
              value={isEdit ? editedData.content : form.content}
              onChange={handleChange}
            />
          </div>
          {!isEdit && (
            <div className="btnContainer">
              <Button type="submit" text="작성" />
              <Button type="button" onClick={() => nav(-1, { replace: true })} text="목록" color="red" />
            </div>
          )}
          {isEdit && (
            <div className="BtnContainer">
              <Button type="submit" text="수정" onClick={onSubmitEdit} />
              <Button type="button" onClick={() => nav(-1, { replace: true })} text="취소" color="red" />
            </div>
          )}
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
    margin: 0px auto;
    gap: 1.5rem;
    background: #fff;
    border: 1px solid #ccc;

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
    font-size: 15px;
    font-weight: bold;
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
