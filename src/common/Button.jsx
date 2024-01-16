import styled from "styled-components";

export default function Button({ text, type, onClick, color }) {
  return (
    <CustomButton type={type} onClick={onClick} color={color}>
      {text}
    </CustomButton>
  );
}

const CustomButton = styled.button`
  padding: 0.5rem 2rem;
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
      case "grey":
        return `background-color: rgb(223, 221, 221); color: black`;
      case "red":
        return `background-color: #f75c82; color: white`;
      default:
        return `background-color: #5d8de6; color: white`;
    }
  }}
`;
