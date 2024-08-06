import React, { useCallback } from 'react';
import styled, {css} from 'styled-components';
import { PagenationProps, PageType, PaginationSpanProps } from '../../model/main(with detail, upload)/mainTypes';

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
const PaginationSpan = styled.span<PaginationSpanProps>`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }

    ${(props) =>
        props.disabled &&
        css`
        cursor: not-allowed;
        color: #d3d3d3;

        &:hover {
            color: #d3d3d3;
        }
    `}
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

const Pagination : React.FC<PagenationProps> = ({ page, setPage }) => {
  const scrollToTop = () : void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPaginationArray = useCallback(() : number[] => {
    const pageArray : number[] = [];
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

  const pageCurrentHandle = (i : number) : void => {
    setPage((current) : PageType => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    scrollToTop();
  };

  const pagePrevHandle = () : void => {
    if (page.page === 1) {
      return;
    };
    let i = page.page - 5;
    if (i < 1) {
      i = 1;
    }
    setPage((current) : PageType => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    scrollToTop();
  };

  const pageNextHandle = () : void => {
    if (page.page === page.totalPage) return;
    let i = page.page + 5;
    if (i > page.totalPage) {
      i = page.totalPage;
    }
    setPage((current) : PageType => {
      const newPage = { ...current };
      newPage.page = i;
      return newPage;
    });
    scrollToTop();
  };

  return (
    <PaginationDiv>
      <PaginationUl>
        <PaginationSpan onClick={pagePrevHandle} disabled={page.page === 1}>{"<<"}</PaginationSpan>
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
        <PaginationSpan onClick={pageNextHandle} disabled={page.page === page.totalPage}>{">>"}</PaginationSpan>
      </PaginationUl>
    </PaginationDiv>
  );
};

export default Pagination;
