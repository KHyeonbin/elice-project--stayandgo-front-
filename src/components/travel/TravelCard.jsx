import React from "react";
import { useState, useEffect } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    if (image) {
      setImageUrls([image]);
    }
  }, [image]);

  const handleClick = () => {
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

TravelCard.defaultProps = {
  title: "부산 서면",
  name: "혜림",
  date: "2024년 2월 3일 ~ 2024년 2월 5일",
  price: 120000,
};

export default TravelCard;
