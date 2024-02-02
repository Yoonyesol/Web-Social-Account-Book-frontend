import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStyleRealWhite } from "../../common/CardStyles";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../common/Modal";
import TransactionEditor from "./TransactionEditor";

const day = ["일", "월", "화", "수", "목", "금", "토"];

export default function TransactionList({ data }) {
  const [transactionData, setTransactionData] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (id) => {
    setIsEdit(true);
    setOpenEditor(true);

    const item = data.find((transaction) => transaction.id === id);

    const selected = {
      id: item.id,
      type: item.amount >= 0 ? "수입" : "지출",
      date: item.date,
      category: item.category,
      title: item.title,
      amount: Math.abs(item.amount),
      memo: item.memo,
    };

    setSelectedData(selected);
  };

  function handleCancelEditor() {
    setOpenEditor(false);
    setIsEdit(false);
  }

  const handleRemove = (id) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setTransactionData((data) => data.filter((item) => item.id !== id));
      alert("삭제 완료");
    }
  };

  return (
    <Section>
      <div className="title">
        <h2>입출금 내역</h2>
        <CiSquarePlus onClick={() => setOpenEditor(true)} />
        {openEditor && (
          <Modal visible={openEditor} closable={true} maskClosable={false} onClose={handleCancelEditor}>
            <TransactionEditor isEdit={isEdit} selectedData={selectedData} closeEditor={handleCancelEditor} />
          </Modal>
        )}
      </div>
      <div className="history">
        <table class="table">
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="date-cell">{`${new Date(item.date).getDate()}일(${
                  day[new Date(item.date).getDay()]
                })`}</td>
                <td className="category-cell">
                  <div className="category-title">
                    <div className="category">{item.category}</div>
                    <div className="title">{item.title}</div>
                  </div>
                </td>
                <td className="memo-cell">{item.memo}</td>
                <td className="amount-cell" style={{ color: item.amount.toString()[0] === "-" ? "#ec444c" : "green" }}>
                  {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td className="action-cell">
                  <FaPen onClick={() => handleEdit(item.id)} />
                  <FaTrashAlt onClick={() => handleRemove(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyleRealWhite}
  .title {
    display: flex;
    justify-content: space-between;
    svg {
      font-size: 1.8rem;
      color: #3c76e0;
      cursor: pointer;
    }
    h2 {
      color: #3c76e0;
      font-family: "Gowun Batang", serif;
      letter-spacing: 0.3rem;
    }
  }

  .ex {
    color: ${(props) => props.color};
  }
  .history {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
  }
  .table {
    display: flex;
    gap: 5rem;
    align-items: center;
    text-align: center;
    line-height: 20px;
    width: 100%;
    td {
      vertical-align: center;
      border-bottom: 1px solid #ccc;
      text-align: center;
      width: 100%;
    }
    tr {
      padding: 90px;
    }
    .category-title {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .category {
      color: grey;
      font-size: 0.7rem;
    }
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .date-cell {
      width: 10vh;
    }

    .category-cell {
      width: 18vh;
    }

    .memo-cell {
      width: 25vh;
      color: grey;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .amount-cell {
      width: 15vh;
    }

    .action-cell {
      width: 10vh;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
