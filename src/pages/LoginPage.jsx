import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from "../components/constants";
import { login } from "../components/util/APIUtils";
import { Link, Navigate } from "react-router-dom";
import fbLogo from "../img/fb-logo.png";
import googleLogo from "../img/google-logo.png";
import githubLogo from "../img/github-logo.png";

function LoginPage({ userInfo }) {
  let location = useLocation(); //location 객체를 location 변수에 저장
  // const history = useNavigate();

  // OAuth2 로그인 시 오류가 발생하면 사용자는 오류와 함께 /login 페이지로 이동
  // 오류를 표시한 다음 location에서 오류 쿼리 매개 변수를 제거
  // const componentDidMount = () => {
  //   if (location.state && location.state.error) {
  //     setTimeout(() => {
  //       alert(location.state.error, {
  //         timeout: 5000,
  //       });
  //       history.replace({
  //         pathname: location.pathname,
  //         state: {},
  //       });
  //     }, 100);
  //   }
  // };

  if (userInfo.authenticated) {
    return (
      <Navigate
        to={{
          pathname: "/main",
          state: { from: location },
        }}
      />
    );
  }
  return (
    <Section>
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">로그인</h1>
          <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
              <img src={googleLogo} alt="Google" /> Log in with Google
            </a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
              <img src={fbLogo} alt="Facebook" /> Log in with Facebook
            </a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
              <img src={githubLogo} alt="Github" /> Log in with Github
            </a>
          </div>
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <LoginForm />
          <span className="signup-link">
            아직 회원가입하지 않으셨나요? <Link to="/signup">회원가입</Link>
          </span>
        </div>
      </div>
    </Section>
  );
}

function LoginForm() {
  //const history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginRequest = Object.assign({}, userInfo);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        alert("로그인 성공!");
        window.location.replace("/main");
      })
      .catch((error) => {
        alert((error && error.message) || "아이디와 비밀번호를 다시 확인해주세요.");
      });
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="loginBtn">
            Login
          </button>
        </div>
      </form>
    </Section>
  );
}

export default LoginPage;

const Section = styled.section`
  .login-container {
    text-align: center;
  }

  .social-login {
    display: flex;
    flex-direction: column;
  }

  .login-content {
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 2px;
    width: 500px;
    display: inline-block;
    margin-top: 30px;
    vertical-align: middle;
    position: relative;
    padding: 35px;
  }

  .social-btn {
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 16px;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid grey;
  }

  .social-btn img {
    height: 32px;
    float: left;
    margin-top: 10px;
  }

  .social-btn.google {
    margin-top: 7px;
  }

  .social-btn.facebook img {
    height: 24px;
    margin-left: 3px;
  }

  .social-btn.github img {
    height: 24px;
    margin-left: 3px;
  }

  .signup-link {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }

  .login-title {
    font-size: 1.5em;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    color: rgba(0, 0, 0, 0.65);
  }

  .form-control {
    margin: 0px 0px;
  }

  .form-item > input {
    font-size: 15px;
    font-weight: 500;
    width: 14rem;
    font-family: "Gowun Batang", serif;
    margin: 0.3rem 0rem 0.1rem 0rem;
  }

  .loginBtn {
    margin: 1rem 0;
    background-color: #5d8de6;
    padding: 0.2rem 1rem;
    font-size: 1rem;
    font-family: "Gowun Batang", serif;
    color: white;
    border-radius: 0.5rem;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .login-content {
      width: 300px;
    }
  }
`;
