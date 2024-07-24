import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import noImg from "../../assets/icons/no.png";

const NoImg = styled.img`
  width: 100px;
  height: 100 px;
`;

const Container = styled.div`
  background-color: white;
  border: solid 1px #bebcbc;
  border-radius: 5px;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  margin: 5px 15px 0 15px;
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
    <Container>
      <NoImg src={noImg} />
      <Title>아직 예약된 여행이 없습니다!</Title>
      <Description>
        여행 가방에 쌓인 먼지를 털어내고 다음 여행 계획을 세워보세요.
      </Description>
      <SearchButton onClick={handleClick}>숙소 검색하기</SearchButton>
    </Container>
  );
};

export default No;