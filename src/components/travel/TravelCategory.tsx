import React, {useCallback} from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";
import Pagination from "../layout/Pagination";
import { TravelCategoryPropsType } from "../../model/travel/travel";

const CategoryBox = styled.div`
  display: flex;
  margin-left: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
`;

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const TravelCategory:React.FC<TravelCategoryPropsType> = ({ pastTravelData, NoReservation, pastPage, setPastPage }) => {

  return (
    <>
      {pastTravelData.length > 0 && (
        <>
          <CategoryBox>
            {pastTravelData.map((item, i) => (
              <TravelCard
                key={i}
                title={item.title}
                name={item.host_nickname}
                startDate={item.start_date}
                endDate={item.end_date}
                totalPrice={item.amount}
                main_image={item.main_image}
                sub_images={item.sub_images}
                adult={item.adult}
                child={item.child}
                baby={item.baby}
              />
            ))}
          </CategoryBox>
          <Pagination page={pastPage} setPage={setPastPage} />
        </>
      ) 
      || 
      (
        NoReservation
      )}
    </>
  );
};

export default TravelCategory;
