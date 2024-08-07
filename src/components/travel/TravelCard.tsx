//여행 탭에 나오는 개별여행컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TravelModal from "./TravelModal";
import ImageSlider from "../layout/ImageSlider";
import { TravelCardPropsType } from "../../model/travel/travel";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  width: calc(100% - 60px);
  height: 111px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  word-break: keep-all;
`;
const Name = styled.span`
  margin-top: 16px;
  font-size: 14px;
  line-height: 17px;
`;
const Date = styled.span`
  margin-top: 8px;
  font-size: 12px;
  line-height: 17px;
`;

const TravelCard:React.FC<TravelCardPropsType> = ({ title, main_image, sub_images = [], name, startDate, endDate, adult, child, baby, totalPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //모달창 열렸는지? 기본값 false
  const [imageUrls, setImageUrls] = useState<string[]>([]); //이미지 url을 배열상태로 저장
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); //현재이미지의 index값 첫번째는 0
  const [modalImageIndex, setModalImageIndex] = useState<number>(0); //모달창에서도 동일

  //이미지가 변경될때마다 상태 업데이트 및 배열에 넣어줌
  useEffect(() => {
    setImageUrls([main_image, ...sub_images]);
  }, []);

  const handleClick = () => {
    //모달창 열기 및 첫번째 이미지 보여주기
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    //모달창 닫기
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
          <Name>호스트: {name}</Name>
          <Date>
            {startDate} ~ {endDate}
          </Date>
        </DetailContainer>
      </Container>
      {isModalOpen && (
        <TravelModal
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          closeModal={closeModal}
          name={name}
          imageUrls={imageUrls}
          title={title}
          startDate={startDate}
          endDate={endDate}
          adult={adult}
          child={child}
          baby={baby}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
};

export default TravelCard;
