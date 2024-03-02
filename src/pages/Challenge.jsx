import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiMailSendFill } from "react-icons/ri";
import { PiChatTeardropDots } from "react-icons/pi";
import { MdThumbUp } from "react-icons/md";
import { fetchBudgetExpenseRatioAPI } from "../utils/challengeAPI";
import { dateToYearMonthFormat } from "../constants/function";
import { useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";

export default function ChallengePage() {
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.user.userInfo.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchBudgetExpenseRatioAPI(dateToYearMonthFormat(new Date()));
        setData(responseData);
      } catch (error) {
        console.log("API 호출 도중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <h2>2월 실시간 소비 순위</h2>
      <span>내 순위</span>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>순위</h1>
            </th>
            <th>
              <h1>이름</h1>
            </th>
            <th>
              <div className="tooltip-toggle" aria-label="총 지출 금액/예산" tabIndex="0">
                <h1>예산 대비 지출</h1>
              </div>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((challenge, idx) => (
            <tr key={challenge.userId} className={challenge.userId === userId ? "my-rank" : ""}>
              <td className="ranking">{idx + 1}위</td>
              <td className="user">{challenge.userName}</td>
              <td className="ratio">{challenge.expenseRatio.toFixed(4)}</td>
              <td>
                <RiMailSendFill />
              </td>
              <td>
                <PiChatTeardropDots />
              </td>
              <td className="like">
                <div className="like-container">
                  <MdThumbUp />
                  <span>0</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 1.5rem;
  height: 100%;

  .container {
    text-align: left;
    overflow: hidden;
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    display: table;
    padding: 0 0 8em 0;
  }

  .container th h1 {
    font-weight: bold;
    font-size: 1.1em;
    text-align: left;
  }

  .container td {
    font-size: 1.05em;

    -webkit-box-shadow: 0 2px 2px -2px #0e1119;
    -moz-box-shadow: 0 2px 2px -2px #0e1119;
    box-shadow: 0 2px 2px -2px #0e1119;
  }

  .container td,
  .container th {
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left: 2%;
  }

  .container tr:nth-child(odd) {
    background-color: #f8f1f5;
  }

  .container tr:nth-child(even) {
    background-color: #e5dae8;
  }

  .container th {
    background-color: #a194b7;
  }

  .container td:first-child {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff6347;
  }

  .container tr:hover {
    background-color: #7d718d;
    color: white;

    -webkit-box-shadow: 0 6px 6px -6px #0e1119;
    -moz-box-shadow: 0 6px 6px -6px #0e1119;
    box-shadow: 0 6px 6px -6px #0e1119;
  }

  .user:hover,
  .ratio:hover {
    background-color: #f7d63c;
    color: #403e10;
    font-weight: bold;

    box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px, #7f7c21 -4px 4px, #7f7c21 -5px 5px,
      #7f7c21 -6px 6px;
    transform: translate3d(6px, -6px, 0);

    transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: line;
  }

  .my-rank {
    border: 3px solid #3c76e0;
  }

  .user {
    font-weight: bold;
  }

  .like-container {
    display: flex;
    flex-direction: column;

    span {
      font-size: 10px;
    }
  }

  svg {
    font-size: 1.3rem;
    cursor: pointer;
  }

  .tooltip-toggle {
    cursor: pointer;
    position: relative;

    //text container
    &::before {
      position: absolute;
      top: -5px;
      left: 120px;
      background-color: #2b222a;
      border-radius: 5px;
      color: #fff;
      content: attr(aria-label);
      padding: 0.5rem;
      text-transform: none;
      transition: all 0.5s ease;
      width: 120px;
    }

    //Setting up the transition
    &::before {
      color: #efefef;
      font-size: 13px;
      opacity: 0;
      pointer-events: none;
      text-align: center;
    }

    //Triggering the transition
    &:focus::before,
    &:hover::before {
      opacity: 1;
      transition: all 0.75s ease;
    }
  }

  @media (max-width: 800px) {
    .container td:nth-child(4),
    .container th:nth-child(4) {
      display: none;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }

  @media screen and (min-width: 280px) and (max-width: 500px) {
    .container th h1 {
      font-size: 0.9em;
    }

    .container td {
      font-size: 0.85em;
    }

    .container td:first-child {
      font-size: 1rem;
    }

    .container td,
    .container th {
      padding: 0.7rem;
    }

    svg {
      font-size: 1.1rem;
    }

    .tooltip-toggle {
      &::before {
        top: 5px;
        left: 50px;
        padding: 0.25rem;
        width: 100px;
      }

      &::before {
        font-size: 12px;
      }
    }
  }
`;
