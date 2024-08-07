//나의숙소 예약관리에서 예약된 숙소가 없을 때 나오는 UI
import React from "react";
import { useNavigate } from "react-router-dom";
import noReserveImg from "../../assets/icons/noreserve.png";
import * as No from "./NoAccReserve.style"

const NoReservation: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/myaccommodation"); // 나의 등록숙소 페이지로 이동
  };

  return (
    <No.Container>
      <No.Content>
        <No.NoReserveImg src={noReserveImg} alt="No Reservation"/>
        <No.Title>아직 예약된 나의 숙소가 없습니다!</No.Title>
        <No.Description>
          나의 숙소를 아릅답게 꾸며주세요!!
        </No.Description>
        <No.SearchButton onClick={handleClick}>나의 등록숙소 확인</No.SearchButton>
      </No.Content>
      <No.ImageContainer />
    </No.Container>
  );
};

export default NoReservation;
