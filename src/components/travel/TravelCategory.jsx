//여행카드 중 지난여행과 다가오는여행 구분하는 컴포넌트
import React from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.h2`
  font-size: 18px;
  margin: 25px 0 0 25px;
  width: 90%;
`;

const CategoryBox = styled.div`
  display: flex;
  margin-left: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const TravelCategory = ({ title, travelData, noReservation }) => {
  return (
    <>
      {travelData.length > 0 ? (
        <Container>
          <CategoryTitle>{title}</CategoryTitle>
          <CategoryBox>
            {travelData.map((item) => (
              <TravelCard
                key={item.id}
                title={item.title}
                name={item.name}
                date={`${item.startDate} ~ ${item.endDate}`}
                price={item.totalPrice}
                image={item.image}
              />
            ))}
          </CategoryBox>
        </Container>
      ) : (
        noReservation
      )}
    </>
  );
};

export default TravelCategory;
