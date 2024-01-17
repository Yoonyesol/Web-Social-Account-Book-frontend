import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { cardStyleRealWhite } from "../../common/CardStyles";
import { CiSquarePlus } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
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
    let array = {};
    data.forEach((it) => {
      const dateKey = new Date(it.date).getDate().toString();
      if (!array[dateKey]) {
        array[dateKey] = [];
      }
      array[dateKey].push(it);
    });

    setTransactionData(Object.values(array));
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
        <table className="table">
          <tbody>
            {transactionData.map((item, index) => (
              <tr key={index}>
                <div className="table-date">{`${new Date(item[0].date).getDate()}일 (${
                  day[new Date(item[0].date).getDay()]
                })`}</div>
                {item.map((data) => (
                  <td className="transaction" key={data.id}>
                    <div className="category-description">
                      <div className="category">{data.category}</div>
                      <div className="description">{data.description}</div>
                    </div>
                    <div className="amount" style={{ color: data.amount.toString()[0] === "-" ? "#ec444c" : "green" }}>
                      {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="memo">{data.memo}</div>
                    <div className="transaction-actions">
                      <div className="">
                        <FaPen onClick={() => handleEdit(data.id)} />
                      </div>
                      <div>
                        <FaTrashAlt onClick={() => handleRemove(data.id)} />
                      </div>
                    </div>
                  </td>
                ))}
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

  .history {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      cursor: pointer;
    }
  }

  .table {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .table-date {
      margin-top: 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      width: 20vh;
      padding: 0.5rem;
    }

    td {
      display: flex;
      flex-direction: column;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      padding: 0.5rem;
    }

    .transaction {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 2rem;
    }

    .category-description {
      display: flex;
      flex-direction: column;
    }

    .category {
      color: grey;
      font-size: 0.7rem;
    }

    .description,
    .memo {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100px;
    }

    .amount {
      display: flex;
      align-items: center;
      font-weight: 550;
    }

    .memo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
    }
  }

  .transaction-actions {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-around;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
