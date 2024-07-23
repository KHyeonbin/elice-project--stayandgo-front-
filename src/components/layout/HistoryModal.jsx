// HistoryModal.js
import React from "react";
import styled from "styled-components";
import ImageSlider from "./ImageSlider";

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
  justify-content: center;
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  border: none;
  cursor: pointer;
`;

const HistoryModal = ({
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
      <ImageSlider
        imageUrls={imageUrls}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
      />
      <h1>{title}</h1>
      <p>{date}</p>
      <h3>총 금액: {price.toLocaleString()}원</h3>
      <CloseButton onClick={closeModal}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

export default HistoryModal;
