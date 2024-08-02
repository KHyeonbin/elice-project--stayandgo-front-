import React, { useCallback } from 'react';
import styled from 'styled-components';

const PaginationDiv = styled.div`
    width: 100%;
    font-size: 17px;
    margin: 0 auto;
    margin-bottom: 100px;
`;
const PaginationUl = styled.ul`
    width: 100%;
    height: 100%;
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const PaginationSpan = styled.span`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }
`;
const PaginationLi = styled.li`
    width: 10px;
    list-style: none;
    cursor: pointer;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }
`;

const Pagination = ({ page, setPage }) => {
  const getPaginationArray = useCallback(() => {
    const pageArray = [];
    let remainPage = page.page;
    let count = 0;
    while ((remainPage - count) % 5 !== 1) {
      count++;
    }
    const startPage = page.page - count;
    remainPage = startPage + 4;
    if (remainPage > page.totalPage) {
      remainPage = page.totalPage;
    }
    const lastPage = remainPage;
    for (let i = startPage; i <= lastPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }, [page]);

  const pageCurrentHandle = (i) => {
    setPage((current) => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pagePrevHandle = () => {
    let i = page.page - 5;
    if (i < 1) {
      i = 1;
    }
    setPage((current) => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pageNextHandle = () => {
    let i = page.page + 5;
    if (i > page.totalPage) {
      i = page.totalPage;
    }
    setPage((current) => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <PaginationDiv>
      <PaginationUl>
        <PaginationSpan onClick={pagePrevHandle}>{"<<"}</PaginationSpan>
        {getPaginationArray().map((v, i) => (
          <PaginationLi
            key={i}
            onClick={() => pageCurrentHandle(v)}
            style={
              page.page === v
                ? { fontWeight: "bold", color: "#E61E51" }
                : { fontWeight: "400", color: "#797979" }
            }
          >
            {v}
          </PaginationLi>
        ))}
        <PaginationSpan onClick={pageNextHandle}>{">>"}</PaginationSpan>
      </PaginationUl>
    </PaginationDiv>
  );
};

export default Pagination;
