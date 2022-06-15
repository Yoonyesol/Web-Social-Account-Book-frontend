import React from "react";

import { AiFillFolderOpen } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

const Td = ({ item, handleRemove, handleEdit, user }) => {
  const onRemove = () => {
    if (user.name === item.author) {
      handleRemove(item.id);
    } else {
      alert("삭제 권한이 없습니다.");
    }
  };

  const onEdit = () => {
    handleEdit(item);
  };

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.lastedit}</td>
      <td>
        <AiFillFolderOpen onClick={onEdit} />
      </td>
      <td>
        <FaTrashAlt onClick={onRemove} />
      </td>
    </tr>
  );
};

export default Td;
