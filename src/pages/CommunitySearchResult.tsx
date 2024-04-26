import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchSearchedDataAPI } from "../utils/communityAPI";
import { PostEntity } from "../types/community";
import SearchBar from "../components/Community/SearchBar";
import ContentList from "../components/Community/ContentList";
import { themeStyle } from "../styles/Theme";

export default function CommunitySearchResult() {
  const { option, keyword } = useParams();
  const [searchedBoard, setSearchedBoard] = useState<PostEntity[]>([]);

  useEffect(() => {
    if (option && keyword) {
      const fetchSearchedPosts = async () => {
        try {
          const posts = await fetchSearchedDataAPI(option, keyword);
          setSearchedBoard(posts);
        } catch (error) {
          setSearchedBoard([]);
          console.log("검색 결과를 불러오지 못했습니다!" + error.message);
        }
      };
      fetchSearchedPosts();
    }
  }, [option, keyword]);

  return (
    <Section>
      <ContentList data={searchedBoard} isSearch={true} searchKeyword={keyword} />
      <SearchBar />
    </Section>
  );
}

const Section = styled.section`
  ${themeStyle}

  @media screen and (min-width: 280px) and (max-width: 550px) {
    padding: 1rem 0.5rem;
  }
`;
