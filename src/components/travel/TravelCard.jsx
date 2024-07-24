//여행 탭에 나오는 개별여행컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TravelModal from "./TravelModal";
import ImageSlider from "../layout/ImageSlider";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  width: 320px;
  height: 111px;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  gap: 20px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  margin-top: 16px;
  font-weight: bold;
  color: #000000;
  font-size: 16px;
  line-height: 19.36px;
`;
const Name = styled.span`
  margin-top: 16px;
  font-size: 14px;
  line-height: 16.94px;
`;
const Date = styled.span`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16.94px;
`;

const TravelCard = ({ title, name, date, price, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 열렸는지? 기본값 false
  const [imageUrls, setImageUrls] = useState([]); //이미지 url을 배열상태로 저장
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //현재이미지의 index값 첫번째는 0
  const [modalImageIndex, setModalImageIndex] = useState(0); //모달창에서도 동일

  useEffect(() => {
    if (image) {
      setImageUrls([image]);
    }
  }, [image]); //이미지가 변경될때마다 상태 업데이트

  const handleClick = () => {
    //클릭시 모달창 열기 및 첫번째 이미지 보여주기
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    //클릭시 모달창 닫기
    setIsModalOpen(false);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <ImageSlider
          imageUrls={imageUrls}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />
        <DetailContainer>
          <Title>{title}</Title>
          <Name>호스트: {name}님</Name>
          <Date>{date}</Date>
        </DetailContainer>
      </Container>
      {isModalOpen && (
        <TravelModal
          name={name}
          imageUrls={imageUrls}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          closeModal={closeModal}
          title={title}
          date={date}
          price={price}
        />
      )}
    </>
  );
};

export default TravelCard;
