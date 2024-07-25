import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import NoReservation from "../components/travel/NoReservation";
import TravelCategory from "../components/travel/TravelCategory";

const Container = styled.div`
  padding-bottom: 60px;
`;
const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 0 0 25px;
  width: 320px;
`;

const TravelPage = () => {
  //로그인 상태 확인
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  //여행카드 세팅
  const [cardData, setCardData] = useState([]);
  //오늘 날짜 기준으로 지난여행, 다가오는여행 상태 세팅
  const [pastTravelData, setPastTravelData] = useState([]);
  const [upcomingTravelData, setUpcomingTravelData] = useState([]);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await fetch("/travelData.json");
        if (!response.ok) {
          throw new Error("네트워크 응답 오류");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchTravelData();

    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });
  }, [setLoginUser]);

  //오늘 날짜를 기준으로 과거, 미래 분류해서 state에 담기
  useEffect(() => {
    const today = new Date();
    //여행의 끝날짜가 오늘보다 앞이면 past
    const pastData = cardData.filter((item) => new Date(item.endDate) < today);
    //여행의 시작날짜가 오늘보다 뒤이면 upcoming
    const upcomingData = cardData.filter(
      (item) => new Date(item.startDate) >= today
    );
    setPastTravelData(pastData);
    setUpcomingTravelData(upcomingData);
  }, [cardData]);

  return (
    <>
      <Header user={loginUser} />
      <Container>
        <Title>여행</Title>
        <TravelCategory
          title="다가오는 여행"
          travelData={upcomingTravelData}
          noReservation={<NoReservation />}
        />
        <TravelCategory title="지난 여행" travelData={pastTravelData} />
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default TravelPage;
