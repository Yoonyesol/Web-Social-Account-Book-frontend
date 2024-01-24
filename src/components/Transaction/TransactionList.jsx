import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { cardStyleRealWhite } from "../../common/CardStyles";
import { FaPen } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../common/Modal";
import TransactionPost from "./TransactionPost";
import TransactionEditor from "./TransactionEditor";

const day = ["일", "월", "화", "수", "목", "금", "토"];

export default function TransactionList({ data }) {
  const [transactionData, setTransactionData] = useState([]);
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModalOn, setEditModalOn] = useState(false);
  const nextId = useRef(5);

  useEffect(() => {
    setTransactionData(data);
  }, [data]);

  const handleSave = (data) => {
    if (data.id) {
      setTransactionData(
        transactionData.map((row) =>
          data.id === row.id
            ? {
                id: data.id,
                type: data.type,
                date: data.date,
                category: data.category,
                content: data.content,
                amount: data.type === "수입" ? data.amount : data.amount * -1,
                memo: data.memo,
              }
            : row,
        ),
      );
    } else {
      setTransactionData((item) =>
        item.concat({
          id: nextId.current,
          type: data.type,
          date: data.date,
          category: data.category,
          content: data.content,
          amount: data.type === "수입" ? data.amount : data.amount * -1,
          memo: data.memo,
        }),
      );
      nextId.current += 1;
    }
    toggleModal();
  };

  const handleRemove = (id) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setTransactionData((data) => data.filter((item) => item.id !== id));
      alert("삭제 완료");
    }
  };

  const handleEdit = (item) => {
    setEditModalOn(true);
    const selectedData = {
      id: item.id,
      type: item.type,
      date: item.date,
      category: item.category,
      content: item.content,
      amount: item.type === "수입" ? item.amount : item.amount * -1,
      memo: item.memo,
    };
    setSelected(selectedData);
  };

  const handleEditSubmit = (item) => {
    handleSave(item);
    setEditModalOn(false);
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  function handleEditCancel() {
    setEditModalOn(false);
  }

  return (
    <Section>
      <div className="title">
        <h2>입출금 내역</h2>
        <CiSquarePlus onClick={toggleModal} />
        {openModal && (
          <Modal visible={toggleModal} closable={true} maskClosable={false} onClose={toggleModal}>
            <TransactionPost onSaveData={handleSave} handleCancel={toggleModal} />
          </Modal>
        )}
      </div>
      <div className="history">
        <table class="table">
          <tbody>
            {transactionData.map((item) => (
              <tr key={item.id}>
                <td className="date-cell">{`${new Date(item.date).getDate()}일 (${
                  day[new Date(item.date).getDay()]
                })`}</td>
                <td className="category-cell">
                  <div className="category-description">
                    <div className="category">{item.category}</div>
                    <div className="description">{item.description}</div>
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
        {editModalOn && (
          <Modal visible={editModalOn} closable={true} maskClosable={false} onClose={handleEditCancel}>
            <TransactionEditor
              selectedData={selected}
              handleEditCancel={handleEditCancel}
              handleEditSubmit={handleEditSubmit}
            />
          </Modal>
        )}
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
    .category-description {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .category {
      color: grey;
      font-size: 0.7rem;
    }
    .description {
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
