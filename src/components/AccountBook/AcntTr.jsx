import React from "react";
import AcntTd from "./AcntTd";

const AcntTr = ({ acntData, handleRemove, handleEdit }) => {
  return (
    <tbody>
      {acntData.map((item) => {
        return <AcntTd key={item.id} item={item} handleRemove={handleRemove} handleEdit={handleEdit} />;
      })}
    </tbody>
  );
};
export default AcntTr;
