import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from "../constants";
import { Link, Navigate } from "react-router-dom";
import fbLogo from "../assets/img/fb-logo.png";
import googleLogo from "../assets/img/google-logo.png";
import githubLogo from "../assets/img/github-logo.png";

export default function LoginPage({ userInfo }) {
  let location = useLocation(); //location 객체를 location 변수에 저~장

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
      <div className="signup-container">
        <div className="signup-content">
          <h1 className="signup-title">회원가입</h1>
          <div className="social-signup">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
              <img src={googleLogo} alt="Google" /> Sign up with Google
            </a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
              <img src={fbLogo} alt="Facebook" /> Sign up with Facebook
            </a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
              <img src={githubLogo} alt="Github" /> Sign up with Github
            </a>
          </div>
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <SignupForm />
          <span className="login-link">
            이미 소셜가계부의 회원이신가요? <Link to="/login">로그인</Link>
          </span>
        </div>
      </div>
    </Section>
  );
}

function SignupForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [signInfo, setSignInfo] = useState(initialState);
  const history = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignInfo({
      ...signInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={signInfo.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={signInfo.email}
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
          value={signInfo.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="singupBtn">
          Sign Up
        </button>
      </div>
    </form>
  );
}

const Section = styled.section`
  margin-left: 5vw;
  padding: 2rem;
  height: 100%;

  .signup-container {
    text-align: center;
  }

  .social-signup {
    display: flex;
    flex-direction: column;
  }

  .signup-content {
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

  .login-link {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }

  .signup-title {
    font-size: 1.5em;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    color: rgba(0, 0, 0, 0.65);
  }

  .form-item > input {
    font-size: 15px;
    font-weight: 500;
    width: 14rem;
    font-family: "Gowun Batang", serif;
    margin: 0.3rem 0rem 0.1rem 0rem;
  }

  .singupBtn {
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
    .signup-content {
      width: 300px;
    }
  }
`;
