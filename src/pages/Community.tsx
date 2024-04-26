import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchAllPostsAPI } from "../utils/communityAPI";
import { PostEntity } from "../types/community";
import SearchBar from "../components/Community/SearchBar";
import ContentList from "../components/Community/ContentList";
import { themeStyle } from "../styles/Theme";

export default function Community() {
  const [board, setBoard] = useState<PostEntity[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await fetchAllPostsAPI();
        setBoard(posts);
      } catch (error) {
        alert("게시글을 불러오지 못했습니다!" + error.message);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <Section>
      <ContentList data={board} isSearch={false} searchKeyword={""} />
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
