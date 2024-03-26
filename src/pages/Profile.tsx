import React from "react";
import styled from "styled-components";
import { BsPhone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { MdPermIdentity } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserInfo } from "../interfaces/UserData";
import { StoreData } from "../interfaces/StoreData";

export default function SettingPage() {
  const userInfo: UserInfo = useSelector((state: StoreData) => state.user.userInfo);

  return (
    <Section>
      <div className="container">
        <div className="title">
          <h2>내 정보</h2>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img className="userShowImg" src={userInfo.image} alt={userInfo.name} />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{userInfo.name}</span>
                <span className="uerShowUserTitle">😀 Have a nice day!</span>
              </div>
            </div>
            <div className="userShowBottom">
              {/* <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <MdPermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">id: {userInfo.userId}</span>
            </div> */}
              <span className="userShowTitle">Contact Details</span>
              {/* <div className="userShowInfo">
              <BsPhone className="userShowIcon" />
              <span className="userShowInfoTitle">010-1234-1234</span>
            </div> */}
              <div className="userShowInfo">
                <AiOutlineMail className="userShowIcon" />
                <span className="userShowInfoTitle">{userInfo.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Detail🖊</span>
            <form className="userUpdateForm">
              <div className="userUpdateItem">
                <label>이름</label>
                <input type="text" placeholder={userInfo.name} className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>이메일</label>
                <input type="text" placeholder={userInfo.email} className="userUpdateInput" />
              </div>
              {/* <div className="userUpdateItem">
              <label>Phone</label>
              <input type="text" placeholder="010-2223-1242" className="userUpdateInput" />
            </div> */}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  align-items: center;

  .title {
    display: flex;
    justify-content: center;

    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }

  .container {
    margin: 0vw 15vw;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 3rem;
  }

  .userContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .userShow {
    flex: 1;
    padding: 50px;
    background-color: white;
    border-radius: 0.4rem;

    -webkit-box-shadow: 2px 4px 15px -2px rgba(0, 0, 0, 0.57);
    box-shadow: 2px 4px 15px -2px rgba(0, 0, 0, 0.57);
  }

  .userUpdate {
    flex: 2;
    padding: 50px;
    background-color: white;
    border-radius: 0.4rem;

    -webkit-box-shadow: 2px 4px 15px -2px rgba(0, 0, 0, 0.57);
    box-shadow: 2px 4px 15px -2px rgba(0, 0, 0, 0.57);
  }

  .userShowUsername {
    font-size: 19px;
    font-weight: 500;
    font-family: "Gowun Batang", serif;
    margin-bottom: 0.5rem;
  }

  .userShowTop {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .userShowImg,
  .text-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .userShowTopTitle {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .userShowUsername {
    font-weight: 600;
  }

  .userShowUserTitle {
    font-weight: 300;
  }

  .userShowTitle {
    font-size: 14px;
    font-weight: 600;
    color: rgb(179, 175, 175);
  }

  .userShowInfo {
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: rgb(97, 96, 96);
  }

  .userShowIcon {
    font-size: 16px !important;
  }

  .userShowInfoTitle {
    margin-left: 10px;
  }

  .userUpdateImg {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 15px;
  }

  .userUpdateForm {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-direction: column;
  }

  .userUpdateItem {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .userUpdateItem > label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .userUpdateInput {
    border: none;
    width: 300px;
    height: 30px;
    border-bottom: 1px solid gray;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;

    .container {
      margin: 0vw 10vw;
    }

    .userUpdateInput {
      width: 15vh;
      height: 30px;
    }

    .userUpdateForm {
      flex-direction: column;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 550px) {
    .userShow,
    .userUpdate {
      padding: 25px;
    }

    .container {
      margin: 0vw;
      gap: 2rem;
    }
  }
`;
