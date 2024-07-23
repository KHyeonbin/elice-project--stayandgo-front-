import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import noImg from "../../assets/icons/no.png";

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

const NoImg = styled.img`
  width: 100px;
  height: 100 px;
`;

const Container = styled.div`
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

const Title = styled.span`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19.36px;
`;

const Description = styled.span`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 16.94px;
`;

const SearchButton = styled.button`
  margin-top: 10px;
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #dc0f62;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const No = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };
  return (
    <ModalOverlay>
      <Container>
        <NoImg src={noImg} />
        <Title>아직 예약된 여행이 없습니다!</Title>
        <Description>
          여행 가방에 쌓인 먼지를 털어내고 다음 여행 계획을 세워보세요.
        </Description>
        <SearchButton onClick={handleClick}>숙소 검색하기</SearchButton>
      </Container>
    </ModalOverlay>
  );
};

export default No;
