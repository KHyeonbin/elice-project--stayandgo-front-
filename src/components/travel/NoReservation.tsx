//여행 탭에서 예약된 여행이 없을 때 나오는 UI
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import handImg from "../../assets/icons/hand.png";
import travelImg from "../../assets/images/travel.png";

const Container = styled.div`
  border: solid 1px #bebcbc;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: 500px) {
    flex-direction: row;
    padding: 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 500px) {
    width: 50%;
    justify-content: center;
  }
`;
const ImageContainer = styled.div`
  height: 0;
  opacity: 0;

  @media (min-width: 500px) {
    background-image: url(${travelImg});
    background-size: cover;
    background-position: center;
    border-radius: 0 10px 10px 0;
    width: 50%;
    height: 320px;
    opacity: 1;
  }
`;
const HandImg = styled.img`
  width: 100px;
`;
const Title = styled.span`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19.36px;
`;
const Description = styled.span`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 16.94px;
  word-break: keep-all; //단어 단위 줄바꿈
`;
const SearchButton = styled.button`
  margin-top: 10px;
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f87878;
  color: white;
  font-size: 16px;
  line-height: 19.36px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fb9d9d;
  }
`;

const NoReservation: React.FC = () => {
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
