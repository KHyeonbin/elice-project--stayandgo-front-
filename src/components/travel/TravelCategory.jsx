//여행카드 중 지난여행과 다가오는여행 구분하는 컴포넌트
import React from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";

const CategoryTitle = styled.h2`
  font-size: 18px;
  margin: 15px 0 0 15px;
`;

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const TravelCategory = ({ title, travelData, noReservation }) => {
  return (
    <>
      {travelData.length > 0 ? (
        <>
          <CategoryTitle>{title}</CategoryTitle>
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
        </>
      ) : (
        noReservation
      )}
    </>
  );
};

export default TravelCategory;
