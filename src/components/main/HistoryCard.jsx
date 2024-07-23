import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

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

const Image = styled.div`
  background-color: #d9d9d9;
  border-radius: 15px;
  width: 111px;
  height: 111px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
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

// 모달 스타일 정의
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  border: none;
  cursor: pointer;
`;

const HistoryCard = ({ title, name, date, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // 서버에서 이미지 URL을 받아오는 예시
    const fetchImage = async () => {
      try {
        const response = await fetch("https://api.example.com/image-url"); // 이미지 URL을 가져오는 API 호출
        const data = await response.json();
        setImageUrl(data.imageUrl); // 받아온 이미지 URL을 상태에 저장
      } catch (error) {
        console.error("이미지 가져오기 실패:", error);
        // 실패 시 기본 이미지 설정
        setImageUrl("https://via.placeholder.com/111");
      }
    };

    fetchImage();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <Image imageUrl={imageUrl}></Image>
        <DetailContainer>
          <Title>{title}</Title>
          <Name>호스트: {name}님</Name>
          <Date>{date}</Date>
        </DetailContainer>
      </Container>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Image imageUrl={imageUrl}></Image>
            <h1>{title}</h1>
            <p>{date}</p>
            <h3>총 금액: {price.toLocaleString()}원</h3>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

HistoryCard.defaultProps = {
  title: "부산 서면",
  name: "혜림",
  date: "2024년 2월 3일 ~ 2024년 2월 5일",
  price: 120000,
};

export default HistoryCard;
