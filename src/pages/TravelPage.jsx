import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  const [cardData, setCardData] = useState([]); //여행아이템 배열로 가져오기
  const [pastTravelData, setPastTravelData] = useState([]); //여행 날짜 기준 지난 여행
  const [upcomingTravelData, setUpcomingTravelData] = useState([]); //여행 날짜 기준 다가오는 여행

  useEffect(() => {
    // 서버에서 데이터 가져오기
    const fetchTravelData = async () => {
      try {
        const response = await fetch("/travelData.json"); // 로컬 JSON 파일 경로
        if (!response.ok) {
          throw new Error("네트워크 응답 오류");
        }
        const data = await response.json();
        setCardData(data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchTravelData();
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });
  }, []);

  useEffect(() => {
    const today = new Date(); //현재 날짜 가져오기

    //여행 마지막 날짜가 오늘보다 이전일떄 지난여행
    const pastData = cardData.filter((item) => new Date(item.endDate) < today);
    //여행 시작 날짜가 오늘 이후일떄 다가올 여행
    const upcomingData = cardData.filter(
      (item) => new Date(item.startDate) >= today
    );

    //상태에 저장
    setPastTravelData(pastData);
    setUpcomingTravelData(upcomingData);
  }, [cardData]);

  return (
    <>
      <Header user={loginUser} />
      <Container>
        <Title>여행</Title>
        {upcomingTravelData.length > 0 ? (
          <>
            <Title>예약된 여행지</Title>
            {upcomingTravelData.map((item) => (
              <TravelCard
                key={item.id}
                title={item.title}
                name={item.name}
                date={`${item.startDate} ~ ${item.endDate}`}
                price={item.totalPrice}
                image={item.image}
              />
            ))}
          </>
        ) : (
          <NoReservation />
        )}
        {pastTravelData.length > 0 && (
          <>
            <Title>이전 여행지</Title>
            {pastTravelData.map((item) => (
              <TravelCard
                key={item.id}
                title={item.title}
                name={item.name}
                date={`${item.startDate} ~ ${item.endDate}`}
                price={item.totalPrice}
                image={item.image}
              />
            ))}
          </>
        )}
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default TravelPage;
