import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ControlOption from "../../common/ControlOption";
import { searchOption } from "../../constants/constant";
import Button from "../../common/Button";

export default function SearchBar() {
  const nav = useNavigate();
  const [option, setOption] = useState<string>("title");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchPost = () => {
    if (searchKeyword) {
      nav(`/community/search/${option}/${searchKeyword}`);
    }
  };

  return (
    <Search>
      <div className="control-input">
        <ControlOption value={option} chooseOption={setOption} optionList={searchOption} />
        <input type="text" value={searchKeyword} onChange={handleChange} />
      </div>
      <Button text={"검색"} type={"button"} onClick={handleSearchPost} />
    </Search>
  );
}

const Search = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .control-input {
    display: flex;
    flex-direction: row;
  }

  input {
    height: 28px;
    margin: 3.2px 0;
  }

  button {
    height: 28px;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    font-size: 13px;
  }

  @media screen and (min-width: 280px) and (max-width: 350px) {
    flex-direction: column;
  }
`;
