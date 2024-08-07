//나의숙소 예약관리에서 예약된 숙소가 없을 때 나오는 UI
import React from "react";
import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/images/home.png";
import * as No from "./NoAccomodation.style"

const NoAccomodation:React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload"); // 나의 등록숙소 페이지로 이동
  };

  return (
    <No.Container>
      <No.Content>
        <No.NoReserveImg src={homeImg} />
        <No.Title>아직 등록된 나의 숙소가 없습니다!</No.Title>
        <No.Description>
          나의 숙소를 등록해주세요!!
        </No.Description>
        
      </No.Content>
      <No.ImageContainer />
    </No.Container>
  );
};

export default NoAccomodation;
