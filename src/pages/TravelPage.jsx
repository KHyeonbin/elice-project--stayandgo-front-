import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import TravelCard from "../components/travel/TravelCard";
import NoReservation from "../components/travel/NoReservation";

const Container = styled.div`
  padding-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 15px;
`;

const TravelPage = () => {
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });
  }, []);

  return (
    <>
      <Header user={loginUser} />
      <Container>
        <Title>여행</Title>
        <NoReservation></NoReservation>
        <Title>이전 여행지</Title>
        <TravelCard />
        <TravelCard title="부산의 집" />
        <TravelCard title="강릉의 집" />
        <TravelCard title="제주의 집" />
        <TravelCard title="서울의 집" />
        <TravelCard title="대전의 집" />
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default TravelPage;
