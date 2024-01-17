import styled from "styled-components";

export default function Header({ text, leftChild, rightChild }) {
  return (
    <DateHeader>
      <div className="left-child">{leftChild}</div>
      <div className="header-text">{text}</div>
      <div className="right-child">{rightChild}</div>
    </DateHeader>
  );
}

const DateHeader = styled.header`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: bold;

  .header-text {
    width: 50%;
    text-align: center;
    justify-content: center;
  }

  .left-child {
    width: 25%;
    justify-content: start;
  }

  .right-child {
    text-align: right;
    width: 25%;
    justify-content: end;
  }
`;
