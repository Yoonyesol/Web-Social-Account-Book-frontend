import styled from "styled-components";

const ControlOption = ({ value, chooseOption, optionList }) => {
  return (
    <StyledSelect value={value} onChange={(e) => chooseOption(e.target.value)}>
      {optionList.map((it, idx) => (
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
  border: 1px solid #ccc;
  padding: 0.3rem;
  color: #333;
`;
