//예약카드 중 지난예약과 다가오는예약 구분하는 컴포넌트
import React, { useState } from "react";
import styled from "styled-components";
import ReserveCard from "./ReserveCard";
import Pagination from "./Pagination";

const Container = styled.div`
padding: 15px 0;
border-radius: 10px;
width: 100%;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
const CategoryTitle = styled.h2`
  font-size: 18px;
  margin: 5px 0 5px 15px;
  width: 90%;
`;
const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FilterSelect = styled.select`
  padding: 5px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 15px;
`;

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const NoAccCategory = ({ title, reserveData, NoAccReserve }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // 모든 제목을 필터 옵션으로 추가
  const uniqueTitles = ["all", ...new Set(reserveData.map(item => item.title))];

  // 선택된 필터에 따라 데이터 필터링
  const filteredData = selectedFilter === "all"
    ? reserveData
    : reserveData.filter(item => item.title === selectedFilter);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };
  
  return (
    <>
      {reserveData.length > 0 ? (
        <Container>
          
          <FilterContainer>
          <CategoryTitle>{title}</CategoryTitle>
            <FilterSelect
              id="filter"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              {uniqueTitles.map((titleOption) => (
                <option key={titleOption} value={titleOption}>
                  {titleOption === "all" ? "모든 숙소" : titleOption}
                </option>
              ))}
            </FilterSelect>
          </FilterContainer>
          <CategoryBox>
            {currentItems.map((item) => (
              <ReserveCard
                key={item.id}
                title={item.title}
                author={item.author}
                startDate={item.startDate}
                endDate={item.endDate}
                amount={item.amount}
                main_image={item.main_image}
                sub_images={item.sub_images}
                adult={item.adult}
                child={item.child}
                baby={item.baby}
                create_at={item.create_at}
              />
            ))}
          </CategoryBox>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      ) : (
        NoAccReserve
      )}
    </>
  );
};

export default NoAccCategory;
