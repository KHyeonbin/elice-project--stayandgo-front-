//나의숙소 예약관리에서 항목 클릭시 나오는 모달 창
import React from "react";
import styled from "styled-components";
import ImageSlider from "../layout/ImageSlider";
import closeImg from "../../assets/icons/close.png";

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
  z-index: 99;
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
  z-index: 100;
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
  font-weight: bold;
  margin: 20px;
  font-size: 20px;
  line-height: 24.2px;
`;
const Title = styled.span`
  margin: 10px 0;
  color: #333333;
  font-size: 16px;
  line-height: 19.36px;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 5px;
`;
const GuestContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const DescriptionBold = styled.span`
  margin-top: 3px;
  color: #555555;
  width: 55px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16.94px;
  text-align: start;
`;
const Description = styled.span`
  margin-top: 5px;
  color: #555555;
  font-size: 15px;
  line-height: 14.52px;
  text-align: end;
`;


const MyAccModal = ({
  modalImageIndex,
  setModalImageIndex,
  closeModal,
  author,
  imageUrls,
  title,
  adult,
  child,
  baby,
  amount,
  create_at,
}) => (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={closeModal}>
        <CloseIcon src={closeImg} alt="닫기" />
      </CloseButton>
      <Name>{author}님의 예약</Name>
      <ImageSlider
        imageUrls={imageUrls}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
        size={200}
      />
      <Title>{title}</Title>
      <TextContent>
        <GuestContent>
          <DescriptionBold>
            게스트 : 
          </DescriptionBold>
          <Description>성인 {adult}명</Description>
        </GuestContent>
        <GuestContent>
          <TextContent>
            <Description>어린이 {child}명</Description>
            <Description>유아 {baby}명</Description>
          </TextContent>
        </GuestContent>
        <GuestContent>
          <DescriptionBold>예약일 :  </DescriptionBold>
          <Description>{create_at}</Description>
        </GuestContent>
        <GuestContent>
          <DescriptionBold>총 금액 : </DescriptionBold>
          <Description>{amount.toLocaleString()}원</Description>
        </GuestContent>
      </TextContent>
    </ModalContent>
  </ModalOverlay>
);

export default MyAccModal;
