import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { loginAPI, signupAPI } from "../utils/userAPI";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../common/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setToken, setTokenExpiration, setUserInfo } from "../modules/user";

export default function Auth() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const tokenExpiration = useSelector((state) => state.user.tokenExpiration);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let responseData;
    try {
      if (isLoginMode) {
        responseData = await loginAPI(form);
      } else {
        responseData = await signupAPI(form);
      }

      dispatch(loginSuccess());
      dispatch(setUserInfo(responseData.userInfo));
      dispatch(setToken(responseData.token));

      //만료시간 3시간
      const tokenExpirationDate = tokenExpiration || new Date(new Date().getTime() + 3 * 1000 * 60 * 60);
      dispatch(setTokenExpiration(tokenExpirationDate));

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userInfo: responseData.userInfo,
          token: responseData.token,
          tokenExpiration: tokenExpirationDate.toISOString(),
        }),
      );

      alert(`${isLoginMode ? "로그인" : "회원가입"}에 성공했습니다!`);

      setIsLoading(false);
      setError(null);

      nav("/", { replace: true });
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "회원가입 진행 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setError(null);
  };

  return (
    <Section>
      <div className="container">
        {isLoading && <LoadingIndicator />}
        <h1>{isLoginMode ? "로그인" : "회원가입"}</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleAuthSubmit}>
          {!isLoginMode && (
            <div className="form-field">
              <h3>이름</h3>
              <div className="form-item">
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="form-field">
            <h3>이메일</h3>
            <div className="form-item">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-field">
            <h3>비밀번호</h3>
            <div className="form-item">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                minLength={6}
                value={form.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="submit-btn">
            <Button type="submit" text={isLoginMode ? "로그인" : "회원가입"} />
          </div>
        </form>
        <div className="switch-mode">
          <span>{isLoginMode ? "아직 회원이 아니신가요?" : "이미 회원이신가요?"}</span>
          <Button color="red" text={isLoginMode ? "회원가입" : "로그인"} onClick={switchModeHandler} />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  .container {
    position: relative;
    width: 500px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    text-align: center;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 10px;
    padding: 35px;
  }

  form {
    border-top: solid 1px #b8b6b6;
    width: 100%;
  }

  .form-field {
    margin-top: 1.2rem;
  }

  .form-item {
    margin-top: 0.7rem;
  }

  .form-item > input {
    font-size: 15px;
    width: 100%;
    height: 35px;
    font-family: "Gowun Batang", serif;
  }

  .submit-btn {
    margin: 2rem 0;
  }

  .switch-mode {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
  }

  button {
    width: 8rem;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;
