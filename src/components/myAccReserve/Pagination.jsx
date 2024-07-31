//나의숙소 예약관리 페이지네이션
import React from "react";
import styled from "styled-components";
import arrowImg from "../../assets/icons/arrow.png"

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
const PageNumber = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#E61E51" : "#797979")};
  background-color: white;
  border: none;
  font-size: 15px;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;
const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  margin: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    //페이지 최대 5개 보여주기
    const MAX_PAGE_DISPLAY = 5;
  
    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
      const pageNumbers = [];
      let startPage, endPage;
  
      //항상 5페이지씩 나오게 (start, end 페이지번호) 조건설정
      if (totalPages <= MAX_PAGE_DISPLAY) {
        // 페이지가 전체 페이지 수(5)보다 적거나 같은 경우
        startPage = 1;
        endPage = totalPages;
      } else {
        // 페이지가 전체 페이지 수(5)보다 많은 경우
          if (currentPage <= 3) {
            // 현재 페이지가 3페이지 이하인 경우
            startPage = 1;
            endPage = Math.min(MAX_PAGE_DISPLAY, totalPages);
          } else if (currentPage >= totalPages - 2) {
            // 현재 페이지가 마지막 3페이지 이상인 경우
            startPage = Math.max(totalPages - MAX_PAGE_DISPLAY + 1, 1);
            endPage = totalPages;
          } else {
            // 현재 페이지가 중앙에 위치한 경우
            startPage = currentPage - 2;
            endPage = currentPage + 2;
          }
      }
      //start~end 페이지번호 배열에 추가
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      return pageNumbers;
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <PaginationContainer>
        <ArrowButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <img src={arrowImg} alt="이전" />
        </ArrowButton>
        {pageNumbers.map((number) => (
          <PageNumber
            key={number}
            isActive={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </PageNumber>
        ))}
        <ArrowButton
          flip
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <img src={arrowImg} alt="다음" />
        </ArrowButton>
      </PaginationContainer>
    );
  };
  
  export default Pagination;