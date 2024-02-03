import React, { useState } from "react";
import styled from "styled-components";
import { cardStyle, cardStyleRealWhite } from "../../common/CardStyles";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../common/Modal";
import TransactionEditor from "./TransactionEditor";
import { deleteTransactionAPI } from "../../utils/api";
import { useDispatch } from "react-redux";
import { removeTransaction } from "../../modules/transactions";

const day = ["일", "월", "화", "수", "목", "금", "토"];

export default function TransactionList({ data }) {
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (id) => {
    setIsEdit(true);
    setOpenEditor(true);

    const item = data.find((transaction) => transaction.id === id);

    const selected = {
      id: item.id,
      transaction_type: item.transaction_type,
      date: item.date,
      category: item.category,
      title: item.title,
      amount: item.amount,
      memo: item.memo,
    };

    setSelectedData(selected);
  };

  function handleCancelEditor() {
    setOpenEditor(false);
    setIsEdit(false);
  }

  const handleRemove = async (id) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      try {
        await deleteTransactionAPI(id);
        dispatch(removeTransaction(id));
        alert("삭제 완료");
      } catch (err) {
        console.log("삭제 중 오류가 발생했습니다.", err.message);
      }
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
        {data.map((item) => (
          <div className="card" key={item.id}>
            <div className="content">
              <div className="cell date">
                <b>{`${new Date(item.date).getDate()}일 (${day[new Date(item.date).getDay()]})`}</b>
              </div>
              <div className="cell category-title">
                <div className="category">{item.category}</div>
                <div className="title">{item.title}</div>
              </div>
              <div className="cell memo">{item.memo}</div>
              <div className="cell amount" style={{ color: item.transaction_type === false ? "#ec444c" : "green" }}>
                {item.transaction_type === false
                  ? "-" + item.amount.toLocaleString("ko-KR")
                  : item.amount.toLocaleString("ko-KR")}
              </div>
              <div className="cell action">
                <FaPen onClick={() => handleEdit(item.id)} />
                <FaTrashAlt onClick={() => handleRemove(item.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle}

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

  .history {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }

  .card {
    ${cardStyleRealWhite}
    padding: 1rem 2rem;
    border: none;
    width: 100%;

    .content {
      display: grid;
      grid-template-columns: 0.8fr 1.5fr 2fr 1fr 1fr;
      justify-content: space-between;
      align-items: center;

      .cell {
        text-align: center;
        padding: 0.5rem;
      }

      .date {
        font-weight: bold;
      }

      .category-title {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .category {
        color: grey;
        font-size: 0.7rem;
      }

      .title {
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .memo {
        color: grey;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .amount {
        color: inherit;
      }

      .action {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
