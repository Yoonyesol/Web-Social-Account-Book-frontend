import React from "react";
import styled from "styled-components";
import Colors from "../../styles/Colors";

interface PaginationType {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }: PaginationType) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PageNav>
      <PageUl className="pagination">
        {pageNumbers.map((number) => (
          <PageLi key={number} className={currentPage === number ? "page-item current" : "page-item"}>
            <PageSpan
              onClick={() => {
                paginate(number);
              }}
              className="page-link"
            >
              {number}
            </PageSpan>
          </PageLi>
        ))}
      </PageUl>
    </PageNav>
  );
};

export default Pagination;

const PageNav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageUl = styled.ul`
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: black;
  padding: 1px;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 15px;
  padding: 5px;
  border-radius: 5px;
  width: 30px;

  &.current {
    font-weight: bold;
  }
`;

const PageSpan = styled.span`
  padding: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${Colors.PURPLE};
  }
`;
