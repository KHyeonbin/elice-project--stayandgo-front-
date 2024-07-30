//여행카드 중 지난여행과 다가오는여행 구분하는 컴포넌트
import React from "react";
import styled from "styled-components";
import ReserveCard from "./ReserveCard";

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
const NoAccCategory = ({ title, reserveData, NoAccReserve }) => {
  return (
    <>
      {reserveData.length > 0 ? (
        <>
          <CategoryTitle>{title}</CategoryTitle>
          <CategoryBox>
            {reserveData.map((item) => (
              <ReserveCard
                key={item.id}
                title={item.title}
                name={item.name}
                startDate={item.startDate}
                endDate={item.endDate}
                totalPrice={item.totalPrice}
                main_image={item.main_image}
                sub_images={item.sub_images}
                adult={item.adult}
                child={item.child}
                baby={item.baby}
              />
            ))}
          </CategoryBox>
        </>
      ) : (
        NoAccReserve
      )}
    </>
  );
};

export default NoAccCategory;
