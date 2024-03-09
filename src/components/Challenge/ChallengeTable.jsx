import styled from "styled-components";
import { IoMdAlert } from "react-icons/io";
import { RiMailSendFill } from "react-icons/ri";
import { PiChatTeardropDots } from "react-icons/pi";
import { MdThumbUp } from "react-icons/md";
import { useSelector } from "react-redux";

let rank = 0;
const rankingImoji = ["🥇 ", "🥈 ", "🥉 "];

export function ChallengeTable({ data }) {
  const userId = useSelector((state) => state.user.userInfo.userId);

  return (
    <Section>
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
              <div className="tooltip-toggle" aria-label="총 지출 금액 / 예산" tabIndex="0">
                <h1>예산 대비 지출</h1>
                <IoMdAlert />
              </div>
            </th>
            <th></th>
            {/* <th></th>
            <th></th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((challenge, idx) => (
            <tr key={challenge.userId} className={challenge.userId === userId ? "my-rank" : ""}>
              <td className="ranking">
                {idx <= 2 ? rankingImoji[idx] : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                {challenge.userId === userId ? (rank = idx + 1) : idx + 1}위
              </td>
              <td className="user">{challenge.userName}</td>
              <td className="ratio">{challenge.expenseRatio.toFixed(4)}</td>
              <td className="email">
                <a href={"mailto:" + challenge.userEmail}>
                  <RiMailSendFill />
                </a>
              </td>
              {/* <td>
                <PiChatTeardropDots />
              </td>
              <td className="like">
                <div className="like-container">
                  <MdThumbUp />
                  <span>0</span>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="rank-description">
        <span style={{ fontSize: "1.2rem" }}>
          🎉나의 순위: <b>{rank === 0 ? "-" : rank}위</b>
        </span>
        {rank === 0 && <span className="comment">※ 예산을 등록하면 나의 소비 순위를 확인할 수 있어요.</span>}
      </div>
    </Section>
  );
}

const Section = styled.section`
  .container {
    text-align: left;
    overflow: auto;
    max-height: 100px;
    border-collapse: collapse;
    width: 100%;
    margin: 20px auto;
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

  .container thead td,
  .container thead th {
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left: 2%;
  }

  .container tbody td,
  .container tbody th {
    padding-bottom: 1%;
    padding-top: 1%;
    padding-left: 1%;
  }

  .container tr:nth-child(odd) {
    background-color: white;
  }

  .container tr:nth-child(even) {
    background-color: #f0eded;
  }

  .container th {
    background-color: #e1dbf0;
  }

  .container td:first-child {
    font-size: 1.2rem;
    font-weight: bold;
    /* color: #ff6347; */
  }

  .container tr:hover {
    background-color: #7d718d;
    /* color: white; */

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
    border: 3px solid #fa8981;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;

    cursor: pointer;
    position: relative;

    svg {
      height: 17px;
      width: 17px;
    }

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

  .email {
     a {
      color: black;
    }
  }

  .rank-description {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .comment {
      font-size: 0.9rem;
    }
  }

  /* @media (max-width: 800px) {
    .container td:nth-child(4),
    .container th:nth-child(4) {
      display: none;
    }
  } */

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
