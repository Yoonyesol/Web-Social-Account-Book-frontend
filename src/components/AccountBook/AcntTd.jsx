import React from "react";

import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const AcntTd = ({ item, handleRemove, handleEdit }) => {
  const onRemove = () => {
    handleRemove(item.id);
  };

  const onEdit = () => {
    handleEdit(item);
  };

  return (
    <tr>
      <td>{item.date}</td>
      <td>{item.inex}</td>
      <td>{item.category}</td>
      <td>{item.content}</td>
      <td>{item.account.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>
        <FaPen onClick={onEdit} />
      </td>
      <td>
        <FaTrashAlt onClick={onRemove} />
      </td>
    </tr>
  );
};

export default AcntTd;
