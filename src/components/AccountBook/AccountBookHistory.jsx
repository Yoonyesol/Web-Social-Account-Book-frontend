import React, { useState, useRef } from "react";
import styled from "styled-components";
import { cardStyle } from "../common/CardStyles";

import Modal from "../common/Modal";
import AccountBookPost from "./AccountBookPost";
import AccountBookEditPost from "./AccountBookEditPost";
import { AccountData } from "./AccountBookDummy";
import AcntTr from "./AcntTr";

import { FiPlusCircle } from "react-icons/fi";

export default function AccountBookHistory() {
  const [budget, setBudget] = useState(300000);
  const [income, setIncome] = useState(190000);
  const [expense, setExpense] = useState(30000);

  const [acntData, setAcntData] = useState(AccountData);
  const [selected, setSelected] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [editModalOn, setEditModalOn] = useState(false);
  const nextId = useRef(5);

  const handleSave = (data) => {
    if (data.id) {
      setAcntData(
        acntData.map((row) =>
          data.id === row.id
            ? {
                id: data.id,
                inex: data.inex,
                date: data.date,
                category: data.category,
                content: data.content,
                account: data.inex === "수입" ? data.account : data.account * -1,
                memo: data.memo,
              }
            : row,
        ),
      );
    } else {
      setAcntData((item) =>
        item.concat({
          id: nextId.current,
          inex: data.inex,
          date: data.date,
          category: data.category,
          content: data.content,
          account: data.inex === "수입" ? data.account : data.account * -1,
          memo: data.memo,
        }),
      );
      nextId.current += 1;
    }
    handleCancel();
  };

  const handleRemove = (id) => {
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      setAcntData((data) => data.filter((item) => item.id !== id));
      alert("삭제 완료");
    }
  };

  const handleEdit = (item) => {
    setEditModalOn(true);
    const selectedData = {
      id: item.id,
      inex: item.inex,
      date: item.date,
      category: item.category,
      content: item.content,
      account: item.inex === "수입" ? item.account : item.account * -1,
      memo: item.memo,
    };
    setSelected(selectedData);
  };

  const handleEditSubmit = (item) => {
    handleSave(item);
    setEditModalOn(false);
  };

  function openModal() {
    setModalOn(true);
  }

  function handleCancel() {
    setModalOn(false);
  }

  function handleEditCancel() {
    setEditModalOn(false);
  }

  return (
    <Section>
      <div className="title">
        <h2>입출금 내역</h2>
        <FiPlusCircle onClick={openModal} />
        {modalOn && (
          <Modal visible={modalOn} closable={true} maskClosable={false} onClose={handleCancel}>
            <AccountBookPost onSaveData={handleSave} handleCancel={handleCancel} />
          </Modal>
        )}
      </div>
      <div className="history">
        <table class="table">
          <AcntTr acntData={acntData} handleRemove={handleRemove} handleEdit={handleEdit} />
        </table>
        {editModalOn && (
          <Modal visible={editModalOn} closable={true} maskClosable={false} onClose={handleEditCancel}>
            <AccountBookEditPost
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
  ${cardStyle}
  .title {
    display: flex;
    justify-content: space-between;
    svg {
      font-size: 1.8rem;
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
    justify-content: space-evenly;
    gap: 2rem;
    align-items: center;
    text-align: center;
    line-height: 3.5;
    td {
      width: 20vh;
      vertical-align: center;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .info {
      gap: 0rem;
    }
  }
`;
