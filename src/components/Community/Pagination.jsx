import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <PageNav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
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
    </div>
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
  margin: 0 5px;
  font-size: 15px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 30px;
`;

const PageSpan = styled.span`
  padding: 10px 15px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #8b8fc8;
  }
  &:focus::after {
    color: white;
    background-color: #8b8fc8;
  }
`;
