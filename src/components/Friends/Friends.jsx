import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { HiArrowNarrowRight } from "react-icons/hi";
import { cardStyle } from "../../common/CardStyles";

export default function Friends() {
  const friend_list = [
    {
      image: "https://cdn.pixabay.com/photo/2022/03/22/18/24/flowers-7085710_960_720.jpg",
      name: "정인하",
      budget: "305,353,330원",
      amount: "33,550원",
    },
    {
      image: "https://cdn.pixabay.com/photo/2021/07/15/05/06/flowers-6467492_960_720.jpg",
      name: "박인하",
      budget: "270,040원",
      amount: "-40,800원",
    },
    {
      image: "https://cdn.pixabay.com/photo/2022/03/26/10/45/frankfurt-7092736_960_720.jpg",
      name: "이인하",
      budget: "304,700원",
      amount: "150원",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Your Friends</h2>
      </div>
      <div className="friend_list">
        {friend_list.map((friends, index) => {
          return (
            <div className="friends" key={index}>
              <div className="friends__title">
                <div className="friends__title__image">
                  <img src={friends.image} alt="friends" />
                </div>
                <div className="friends__title__details">
                  <h3>{friends.name}</h3>
                  <h5>{friends.budget}</h5>
                </div>
              </div>
              <div className="friends__amount">
                <span>{friends.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/friendlist" className="view">
        목록보기 <HiArrowNarrowRight />
      </Link>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }
  .friend_list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .friends {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            cursor: pointer;
          }
          &__details {
          }
        }
      }
      &_amount {
        background-color: #0c43a8;
        padding: 0.2rem 0.5rem;
        width: 4rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #6c5a74;
          span {
            color: white;
          }
        }
        span {
          color: white;
        }
      }
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #3c76e0;
    font-family: "Gowun Batang", serif;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .friend_list {
      .friends {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
