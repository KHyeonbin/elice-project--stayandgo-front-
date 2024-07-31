//나의숙소 예약관리 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import axios from "axios";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import NoAccReserve from "../components/myAccReserve/NoAccReserve";
import MyAccCategory from "../components/myAccReserve/MyAccCategory";

const Container = styled.div`
  padding-bottom: 60px;
`;
const Title = styled.h1` 
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  line-height: 24.2px;
`;

const MyAccReservePage = () => {
  //로그인 상태 확인
  const loginUser = useRecoilValue(loginState);
  //예약카드 세팅
  const [cardData, setCardData] = useState([]);
  //오늘 날짜 기준으로 지난예약, 다가오는예약 상태 세팅
  const [pastReserveData, setPastReserveData] = useState([]);
  const [upcomingReserveData, setUpcomingReserveData] = useState([]);

  useEffect(() => {
    const fetchReserveData = async () => {
      try {
        const response = await axios.get("/reserveData.json"); //api 주소 넣기
        setCardData(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchReserveData();
  }, []);

  //오늘 날짜를 기준으로 과거, 미래 분류해서 state에 담기
  useEffect(() => {
    const today = new Date();
    
    const pastData = cardData
      .filter((item) => new Date(item.endDate) < today) // 예약의 체크아웃 날짜가 오늘보다 앞일 때
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate)); //체크아웃 날짜가 최신이 먼저 오게 정렬

    const upcomingData = cardData
      .filter((item) => new Date(item.startDate) >= today)// 체크인때 날짜가 오늘보다 뒤일때
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // 체크인 빠른 순 먼저 오게 정렬

    setPastReserveData(pastData);
    setUpcomingReserveData(upcomingData);
  }, [cardData]);

  return (
    <>
      <Header user={loginUser} />
      <Container>
        <Title>나의 숙소 예약관리</Title>
        <MyAccCategory
          title="예약 목록"
          reserveData={upcomingReserveData}
          NoAccReserve={<NoAccReserve />}
        />
        <MyAccCategory 
        title="지난 예약 목록" 
        reserveData={pastReserveData} />
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default MyAccReservePage;