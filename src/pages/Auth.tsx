import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { loginAPI, signupAPI } from "../utils/userAPI";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../common/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setToken, setTokenExpiration, setUserInfo } from "../modules/user";
import { useRef } from "react";
import { RootState } from "../modules/rootReducer";
import { AuthFormType, AuthResponseType } from "../types";
import Colors from "../styles/Colors";

export default function Auth() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const tokenExpiration: string = useSelector((state: RootState) => state.user.tokenExpiration);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPw, setIsShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [form, setForm] = useState<AuthFormType>({
    name: "",
    email: "",
    password: "",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorMsg) {
      setErrorMsg(null);
    }

    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAuthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let responseData: AuthResponseType;
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
      const tokenExpirationDate = tokenExpiration || new Date(new Date().getTime() + 3 * 1000 * 60 * 60).toString();
      dispatch(setTokenExpiration(tokenExpirationDate));

      setIsLoading(false);
      setErrorMsg(null);
      nav("/", { replace: true });
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "회원가입 진행 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setErrorMsg(null);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleShowPw = () => {
    setIsShowPw(!isShowPw);
  };

  const autoFillTestAuth = () => {
    emailInputRef.current!.value = "112@naver.com";
    passwordInputRef.current!.value = "qwer1234";

    form.email = "112@naver.com";
    form.password = "qwer1234";
  };

  return (
    <Section>
      <div className="container">
        <h1>{isLoginMode ? "로그인" : "회원가입"}</h1>
        {isLoginMode ? (
          <span className="auto-fill" onClick={autoFillTestAuth}>
            테스트 계정 로그인
          </span>
        ) : (
          ""
        )}
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
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
                  ref={nameInputRef}
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
                ref={emailInputRef}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-field">
            <h3>비밀번호</h3>
            <div className="form-item">
              <input
                type={isShowPw ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                minLength={6}
                autoComplete="off"
                ref={passwordInputRef}
                value={form.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="show-password">
              <input type="checkbox" onChange={handleShowPw} />
              <label>비밀번호 보이기</label>
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
    width: 30rem;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    text-align: center;
    align-items: center;
    background: white;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 10px;
    padding: 35px;
  }

  .auto-fill {
    cursor: pointer;
    color: #8b8b8b;
    font-size: 13px;
    text-decoration: underline;
  }

  form {
    border-top: solid 1px ${Colors.BORDER_GRAY};
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

  .show-password {
    margin-top: 0.6rem;
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    justify-content: start;
    color: rgba(0, 0, 0, 0.65);

    label {
      font-size: 13px;
    }
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

  @media screen and (min-width: 280px) and (max-width: 520px) {
    .container {
      width: 85%;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;
