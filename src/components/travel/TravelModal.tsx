//여행 탭에서 항목 클릭시 나오는 모달 창
import React from "react";
import styled from "styled-components";
import ImageSlider from "../layout/ImageSlider";
import closeImg from "../../assets/icons/close.png";
import { TravelModalPropsType } from "../../model/travel/travel";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  z-index: 98;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 99;
`;
const CloseButton = styled.button`
  margin: 10px 10px 0 0;
  top: 5px;
  right: 5px;
  background-color: white;
  position: absolute;
  border: none;
  cursor: pointer;
`;
const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
`;
const Name = styled.span`
  margin: 20px;
  font-size: 20px;
  line-height: 24px;
`;
const Title = styled.span`
  margin: 10px 0;
  font-weight: bold;
  color: #333333;
  font-size: 16px;
  line-height: 20px;
`;
const DateContainer = styled.div`
  width: 80%;
  display: flex;
  padding-bottom: 10px;
`;
const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 17px;
  border-right: 2px solid #dddddd;
`;
const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 17px;
`;
const DescriptionBold = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 14px;
  line-height: 17px;
`;
const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 15px;
`;
const Price = styled.span`
  font-weight: bold;
  margin-top: 7px;
  font-size: 14px;
  line-height: 17px;
`;

const TravelModal:React.FC<TravelModalPropsType> = ({ 
  modalImageIndex, 
  setModalImageIndex, 
  closeModal, 
  name, 
  imageUrls, 
  title, 
  startDate, 
  endDate, 
  adult, 
  child, 
  baby, 
  totalPrice 
}) => (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={closeModal}>
        <CloseIcon src={closeImg} alt="닫기" />
      </CloseButton>
      <Name>{name}님의 숙소</Name>
      <ImageSlider
        imageUrls={imageUrls}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
        size={200}
      />
      <Title>{title}</Title>
      <DateContainer>
        <StartDate>
          <DescriptionBold>체크인</DescriptionBold>
          <Description>{startDate}</Description>
        </StartDate>
        <EndDate>
          <DescriptionBold>체크아웃</DescriptionBold>
          <Description>{endDate}</Description>
        </EndDate>
      </DateContainer>
      <Description>
        게스트 수: 성인 {adult}명, 어린이 {child}명, 유아 {baby}명
      </Description>
      <Price>총 금액: {totalPrice.toLocaleString('ko-KR')}원</Price>
    </ModalContent>
  </ModalOverlay>
);

export default TravelModal;
