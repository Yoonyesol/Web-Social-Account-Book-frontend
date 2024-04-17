import React, { useState } from "react";
import styled from "styled-components";
import { cardStyle, cardStyleRealWhite } from "../../common/CardStyles";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../common/Modal";
import TransactionEditor from "./TransactionEditor";
import { deleteTransactionAPI } from "../../utils/transactionAPI";
import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../../modules/transactions";
import ControlOption from "../../common/ControlOption";
import { day, sortOption } from "../../constants/constant";
import { RootState } from "../../modules/rootReducer";
import { TransactionEntity } from "../../types";

export default function TransactionList({ data }) {
  const dispatch = useDispatch();
  const token: string = useSelector((state: RootState) => state.user.token);
  const [selectedData, setSelectedData] = useState<TransactionEntity>({
    _id: "",
    id: "",
    transaction_type: false,
    category: "",
    title: "",
    amount: 0,
    date: new Date().getTime(),
    memo: "",
  });
  const [openEditor, setOpenEditor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sortType, setSortType] = useState("latest");

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setOpenEditor(true);

    const item = data.find((transaction: TransactionEntity) => transaction._id === id);

    const selected = {
      _id: item._id,
      id: item._id,
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

  const handleRemove = async (id: string) => {
    setOpenEditor(false);
    if (window.confirm("내역을 삭제하시겠습니까?")) {
      try {
        await deleteTransactionAPI(id, token);
        dispatch(removeTransaction(id));
        alert("삭제 완료!");
      } catch (err) {
        alert("가계부 내역 삭제 도중 오류가 발생했습니다." + err.message);
      }
    }
  };

  const getSortedTransactionList = () => {
    const compare = (a: TransactionEntity, b: TransactionEntity): number => {
      if (sortType === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };

    const copyList = JSON.parse(JSON.stringify(data));
    const sortedList = copyList.sort(compare);

    return sortedList;
  };

  return (
    <Section>
      <div className="main-title">
        <h2>입출금 내역</h2>
        <CiSquarePlus onClick={() => setOpenEditor(true)} />
        {openEditor && (
          <Modal visible={openEditor}>
            <TransactionEditor isEdit={isEdit} selectedData={selectedData} closeEditor={handleCancelEditor} />
          </Modal>
        )}
      </div>
      <ControlOption value={sortType} chooseOption={setSortType} optionList={sortOption} />
      <div className="history">
        {getSortedTransactionList().map((item: TransactionEntity) => (
          <div className="card" key={item._id}>
            <div className="content">
              <div className="tr-data" onClick={() => handleEdit(item._id!)}>
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
              </div>

              <div className="cell action">
                <FaTrashAlt onClick={() => handleRemove(item._id!)} />
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

  .main-title {
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
    margin-bottom: 1.5rem;
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
      grid-template-columns: 9fr 1fr;
      align-items: center;

      .tr-data {
        cursor: pointer;
        display: grid;
        grid-template-columns: 0.8fr 1.5fr 2fr 1fr;
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

          .category {
            color: grey;
            font-size: 0.7rem;
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .title {
            font-size: 1rem;
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .memo {
          color: grey;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .action {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 540px) {
    font-size: 80%;
  }

  @media screen and (min-width: 280px) and (max-width: 500px) {
    padding: 0.9rem;

    .card {
      padding: 0.5rem;

      .content {
        .tr-data {
          grid-template-columns: 1fr 1fr 1fr;
          .category-title {
            .category {
              font-size: 0.55rem;
              width: 50px;
            }
            .title {
              width: 50px;
              font-size: 0.7rem;
            }
          }
          .amount {
            font-size: 0.7rem;
          }
          .memo {
            display: none;
          }
        }
      }
    }
  }
`;
