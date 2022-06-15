import React from "react";
import styled from "styled-components";

export const RecieveChatCard = ({ massage, time, author }) => {
  return (
    <Card>
      <ReceiverName>{author}</ReceiverName>
      <ReceiverCard>{massage}</ReceiverCard>
      <ReceiverDate>{time}</ReceiverDate>
    </Card>
  );
};

export const SeneChatCard = ({ massage, time }) => {
  return (
    <Card>
      <SenderCard>{massage}</SenderCard>
      <SenderDate>{time}</SenderDate>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
`;

const SenderDate = styled.span`
  float: left;
  width: 98.5%;
  text-align: right;
  margin-bottom: 1rem;
  font-size: 15px;
`;

const ReceiverDate = styled.span`
  float: left;
  font-size: 15px;
  width: 100%;
  padding-left: 15px;
  margin-bottom: 1rem;
`;

const ReceiverName = styled.span`
  float: left;
  font-size: 15px;
  width: 100%;
  padding-left: 15px;
`;

const SenderCard = styled.div`
  float: right;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 5px 10px;
  background-color: yellow;
  color: black;
  border-radius: 10px;
`;

const ReceiverCard = styled.div`
  float: left;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 5px 10px;
  background-color: white;
  border-radius: 10px;
`;
