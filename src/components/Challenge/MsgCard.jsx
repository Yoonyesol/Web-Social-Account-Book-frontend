import React from "react";
import styled from "styled-components";

const MsgCard = ({ item }) => {
  return (
    <Card>
      <Nickname>{item.nickname}</Nickname>
      <Date>{item.createdAt}</Date>
      <Content>{item.content}</Content>
    </Card>
  );
};

export default MsgCard;

const Card = styled.div`
  width: 100%;
  height: 10vh;
  border-bottom: 0.1rem solid #cbcccf;
  &:hover {
    background-color: #8eafeb;
  }
  padding-top: 1rem;
  padding-left: 1rem;
`;

const Nickname = styled.div`
  float: left;
  width: 70%;
  height: 40px;
`;

const Date = styled.div`
  float: left;
  width: 30%;
  height: 40px;
`;

const Content = styled.div`
  width: 100%;
  height: 80px;
  overflow: hidden;
`;
