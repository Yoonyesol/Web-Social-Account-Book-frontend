import React from "react";
import styled from "styled-components";
import { BsPhone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { MdPermIdentity } from "react-icons/md";
import { useSelector } from "react-redux";

export default function SettingPage() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Section>
      <div className="user">
        <div className="userTitleContainer">
          <h1>내 정보</h1>
          {/* <h2>{user.currentUser.name}</h2> */}
          {/* <button className="userInfoEditButton">수정</button> */}
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              {userInfo.image ? (
                <img className="userShowImg" src={userInfo.image} alt={userInfo.name} />
              ) : (
                <div className="text-avatar">
                  <span>{userInfo.name}</span>
                </div>
              )}

              <div className="userShowTopTitle">
                <span className="userShowUsername">{userInfo.name}</span>
                <span className="uerShowUserTitle">Have a nice day!</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <MdPermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">id: {userInfo.userId}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <BsPhone className="userShowIcon" />
                <span className="userShowInfoTitle">010-1234-1234</span>
              </div>
              <div className="userShowInfo">
                <AiOutlineMail className="userShowIcon" />
                <span className="userShowInfoTitle">{userInfo.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Detail</span>
            <form className="userUpdateForm">
              <div className="userUpdateItem">
                <label>Username</label>
                <input type="text" placeholder={userInfo.name} className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input type="text" placeholder={userInfo.email} className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input type="text" placeholder="010-2223-1242" className="userUpdateInput" />
              </div>
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
  height: 100%;

  .user {
    flex: 4;
    padding: 0 30px;
    margin: 8vw 8vw;
  }

  .userTitleContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }

  .userInfoEditButton {
    width: 80px;
    border: none;
    padding: 5px;
    background-color: rgb(37, 189, 174);
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
  }

  .userContainer {
    display: flex;
    margin-top: 20px;
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

    margin-left: 20px;
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
    position: initial;
    width: 100%;
    height: max-content;
    padding: 0rem;

    .userContainer {
      flex-direction: column;
    }

    .userShow {
      margin-bottom: 2rem;
    }

    .userUpdate {
      margin-left: 0px;
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
`;
