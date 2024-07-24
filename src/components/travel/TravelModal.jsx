//여행 탭에서 항목 클릭시 나오는 모달 창
import React from "react";
import styled from "styled-components";
import ImageSlider from "../layout/ImageSlider";

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
  z-index: 1;
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
`;
const Name = styled.span`
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 24.2px;
`;
const Title = styled.span`
  margin-top: 10px;
  font-weight: bold;
  color: #333333;
  font-size: 16px;
  line-height: 19.36px;
`;
const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
`;
const Price = styled.span`
  font-weight: bold;
  margin-top: 7px;
  font-size: 14px;
  line-height: 16.94px;
`;
const CloseButton = styled.button`
  margin-top: 10px;
  border: none;
  cursor: pointer;
`;

const TravelModal = ({
  name,
  imageUrls,
  modalImageIndex,
  setModalImageIndex,
  closeModal,
  title,
  date,
  price,
}) => (
  <ModalOverlay>
    <ModalContent>
      <Name>{name}님의 숙소</Name>
      <ImageSlider
        imageUrls={imageUrls}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
        size={200}
      />
      <Title>{title}</Title>
      <Description>{date}</Description>
      <Price>총 금액: {price.toLocaleString()}원</Price>
      <CloseButton onClick={closeModal}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

export default TravelModal;
