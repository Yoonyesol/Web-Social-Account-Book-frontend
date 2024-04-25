import React from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

type ControlOptionProps = {
  value: string;
  chooseOption: React.Dispatch<React.SetStateAction<string>>;
  optionList: OptionListType[];
};

interface OptionListType {
  value: string;
  name: string;
}

const ControlOption = ({ value, chooseOption, optionList }: ControlOptionProps) => {
  return (
    <StyledSelect value={value} onChange={(e) => chooseOption(e.target.value)}>
      {optionList.map((it: OptionListType, idx: number) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default ControlOption;

const StyledSelect = styled.select`
  margin: 0.2rem 0;
  background-color: #f0f0f0;
  border: 1px solid ${Colors.BORDER_GRAY};
  padding: 0.3rem;
  color: #333;
`;
