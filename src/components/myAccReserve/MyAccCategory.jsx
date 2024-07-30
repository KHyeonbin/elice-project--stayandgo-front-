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

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const NoAccCategory = ({ title, reserveData, NoAccReserve }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reserveData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = reserveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <>
      {reserveData.length > 0 ? (
        <Container>
          <CategoryTitle>{title}</CategoryTitle>
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
