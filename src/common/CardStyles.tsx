import { css } from "styled-components";
import Colors from "../styles/Colors";

export const cardStyle = css`
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: #e1dbf0;
  color: black;
`;

export const cardStyleWhite = css`
  padding: 1rem 2rem 3rem 2rem;
  border-radius: 1rem;
  background-color: #efecf5;
  color: black;
`;

export const cardStyleRealWhite = css`
  padding: 1rem 2rem 3rem 2rem;
  border-radius: 1rem;
  background-color: white;
  border: 0.8px solid rgb(112, 112, 112);
  color: black;
`;

export const cardStylePurple = css`
  padding: 1rem 2rem 3rem 2rem;
  border-radius: 1rem;
  background-color: ${Colors.PURPLE};
  color: black;
`;
