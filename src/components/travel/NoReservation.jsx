//여행 탭에서 예약된 여행이 없을 때 나오는 UI
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import handImg from "../../assets/icons/hand.png";
import travelImg from "../../assets/images/travel.png";

const HandImg = styled.img`
  width: 100px;
  height: 100 px;
`;

const Container = styled.div`
  background-color: white;
  border: solid 1px #bebcbc;
  border-radius: 5px;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  margin: 25px auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 500px) {
    flex-direction: row;
    width: 90%;
    padding: 0;
    text-align: left;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 500px) {
    width: 50%;
    margin: 0 20px;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  margin-top: 20px;
  background-color: red;
  background-image: url(${travelImg});
  background-size: cover;
  background-position: center;
  border-radius: 0 5px 5px 0;
  opacity: 0;

  @media (min-width: 500px) {
    width: 50%;
    height: 320px;
    margin: 0;
    opacity: 1;
  }
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
  word-break: keep-all; //단어 단위 줄바꿈
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

const NoReservation = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Container>
      <Content>
        <HandImg src={handImg} />
        <Title>아직 예약된 여행이 없습니다!</Title>
        <Description>
          여행 가방에 쌓인 먼지를 털어내고 다음 여행 계획을 세워보세요.
        </Description>
        <SearchButton onClick={handleClick}>숙소 검색하기</SearchButton>
      </Content>
      <ImageContainer />
    </Container>
  );
};

export default NoReservation;
