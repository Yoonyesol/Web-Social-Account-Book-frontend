import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
};

export default function Button({ text, type, onClick, color }: ButtonProps) {
  return (
    <CustomButton type={type} onClick={onClick} color={color}>
      {text}
    </CustomButton>
  );
}

const CustomButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-family: "Gowun Batang", serif;
  border-radius: 0.5rem;
  border: 0;
  outline: 0;
  cursor: pointer;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 0.25rem 1rem;
  }

  ${(props) => {
    switch (props.color) {
      case "white":
        return `background-color: white; color: black; border:1px solid black`;
      case "grey":
        return `background-color: ${Colors.BORDER_GRAY}; color: black`;
      case "red":
        return `background-color: ${Colors.RED}; color: white`;
      case `purple`:
        return `background-color: ${Colors.PURPLE}; color: white`;
      default:
        return `background-color: #5d8de6; color: white`;
    }
  }}
`;
