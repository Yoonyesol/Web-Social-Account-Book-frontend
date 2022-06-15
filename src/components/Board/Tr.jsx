import React from "react";
import Td from "./Td";

const Tr = ({ board, handleRemove, handleEdit, userInfo }) => {
  return (
    <tbody>
      {board.map((item) => {
        return <Td key={item.id} item={item} handleRemove={handleRemove} handleEdit={handleEdit} user={userInfo} />;
      })}
    </tbody>
  );
};

export default Tr;
