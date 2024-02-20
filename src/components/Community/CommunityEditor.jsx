import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ControlOption from "../../common/ControlOption";
import { categoryOption } from "../../constants/constant";
import { createPostAPI, updatePostAPI } from "../../utils/communityAPI";
import { setDate } from "../../constants/function";
import LoadingIndicator from "../../common/LoadingIndicator";

const CommunityEditor = () => {
  const nav = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isEdit, setIsEdit] = useState(location.state === null ? false : true);
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState({ ...location.state });
  const [selectedCategory, setSelectedCategory] = useState(
    location.state === null ? categoryOption[0].value : location.state.category,
  );

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEdit) {
      setEditedData({
        ...editedData,
        [name]: value,
        category: selectedCategory,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
        writer: userInfo.userId,
        category: selectedCategory,
      });
    }
  };

  useEffect(() => {
    setEditedData((prevForm) => ({
      ...prevForm,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isEdit) {
      try {
        const post = await createPostAPI(form, token);
        setIsLoading(false);
        alert("저장되었습니다!");
        nav(`/community/${post._id}`, {
          replace: true,
        });
      } catch (error) {
        setIsLoading(false);
        console.log("post 진행 중 오류가 발생했습니다.", error.message);
      }
    } else {
      try {
        await updatePostAPI(editedData, token);
        setIsLoading(false);
        alert("수정되었습니다!");
        nav(`/community/${editedData.id}`, { replace: true });
      } catch (error) {
        setIsLoading(false);
        console.log("update 진행 중 오류가 발생했습니다.", error.message);
      }
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
            <div className="formItem">
              <label className="date">작성일</label>
              {setDate(new Date(), true)}
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
            <div className="btn-container">
              <Button type="submit" text="작성" />
              <Button type="button" onClick={() => nav(-1, { replace: true })} text="목록" color="red" />
            </div>
          )}
          {isEdit && (
            <div className="btn-container">
              <Button type="submit" text="수정" />
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
    font-size: 14px;
    padding: 0.5rem;
  }

  .formInput {
    width: 35vw;
    height: 30px;
    border-radius: 0.25rem;
  }

  .formArea {
    font-family: "Montserrat", sans-serif;
    width: 35vw;
    height: 400px;
    border-radius: 0.25rem;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
