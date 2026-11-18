import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ControlOption from "../../common/ControlOption";
import { categoryOption } from "../../constants/constant";
import { createPostAPI, fetchPostByCidAPI, updatePostAPI } from "../../utils/communityAPI";
import { setDate } from "../../constants/function";
import LoadingIndicator from "../../common/LoadingIndicator";
import { RootState } from "../../modules/rootReducer";
import { EditPostFormType, PostEntity, PostFormType, UserInfoType } from "../../types";
import Colors from "../../styles/Colors";

export function EditCommunityPost() {
  const { cid } = useParams();
  const userId = useSelector((state: RootState) => state.user.userInfo.userId);
  const [post, setPost] = useState<PostEntity>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setPost(undefined);
    setFailed(false);
    if (cid) {
      fetchPostByCidAPI(cid).then((data) => {
        if (!active) return;
        if (data.writer.uid === userId) setPost(data);
        else setFailed(true);
      }).catch(() => {
        if (active) setFailed(true);
      });
    }
    return () => { active = false; };
  }, [cid, userId]);

  if (failed) {
    return <Section><p>수정할 수 있는 게시글을 찾지 못했습니다.</p><Link to="/community">목록으로</Link></Section>;
  }
  if (!post || post.id !== cid) return <LoadingIndicator />;
  return <CommunityEditor key={post.id} post={post} />;
}

const CommunityEditor = ({ post }: { post?: PostEntity }) => {
  const nav = useNavigate();
  const userInfo: UserInfoType = useSelector((state: RootState) => state.user.userInfo);
  const token: string = useSelector((state: RootState) => state.user.token);

  const isEdit = Boolean(post);
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState<EditPostFormType>({
    id: post?.id,
    title: post?.title ?? "",
    content: post?.content ?? "",
    category: post?.category,
  });
  const [selectedCategory, setSelectedCategory] = useState(post?.category ?? categoryOption[0].value);

  const [form, setForm] = useState<PostFormType>({
    title: "",
    content: "",
    date: new Date(),
    writer: "",
    category: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setEditedData((prevForm: EditPostFormType) => ({
      ...prevForm,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isEdit) {
      try {
        const post = await createPostAPI({ ...form, category: selectedCategory }, token);
        setIsLoading(false);
        alert("저장되었습니다!");
        nav(`/community/${post._id}`, {
          replace: true,
        });
      } catch (error) {
        setIsLoading(false);
        alert("게시글을 작성하지 못했습니다." + error.message);
      }
    } else {
      try {
        await updatePostAPI(editedData, token);
        setIsLoading(false);
        alert("수정되었습니다!");
        nav(`/community/${editedData.id}`, { replace: true });
      } catch (error) {
        setIsLoading(false);
        alert("게시글을 수정하지 못했습니다." + error.message);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Section>
      <div className="container">
        <h3>{isEdit ? "글 수정" : "게시글 등록"}</h3>
        {!isEdit && <p>새 게시글과 댓글은 로그인하지 않은 방문자도 볼 수 있습니다.</p>}
        <form className="form" onSubmit={onSubmit}>
          <div className="formItem">
            <label className="writer">작성자</label>
            <input className="formInput" type="text" name="writer" value={userInfo.name} readOnly />
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
              name="content"
              value={isEdit ? editedData.content : form.content}
              onChange={handleChange}
            />
          </div>
          {!isEdit && (
            <div className="btn-container">
              <Button type="submit" text="공개로 작성" />
              <Button
                type="button"
                onClick={() =>
                  nav("/community", {
                    replace: true,
                  })
                }
                text="목록"
                color="red"
              />
            </div>
          )}
          {isEdit && (
            <div className="btn-container">
              <Button type="submit" text="수정" />
              <Button
                type="button"
                onClick={() => nav(`/community/${editedData.id}`, { replace: true })}
                text="취소"
                color="red"
              />
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
    border: 1px solid ${Colors.BORDER_GRAY};

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
