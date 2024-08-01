//나의숙소 예약관리 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import NoAccReserve from "../components/myAccReserve/NoAccReserve";
import MyAccCategory from "../components/myAccReserve/MyAccCategory";
import getTravelLoad from "../api/getTravelLoad";

const Container = styled.div`
  padding-bottom: 60px;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`
const Title = styled.h1` 
  font-size: 20px;
  line-height: 24.2px;
`;
const Select = styled.select`
  padding: 5px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const MyAccReservePage = () => {
  //로그인 상태 확인
  const loginUser = useRecoilValue(loginState);
  const navigate = useNavigate();

  //예약카드 세팅
  const [cardData, setCardData] = useState([]);
  //오늘 날짜 기준으로 지난예약, 다가오는예약 상태 세팅
  const [pastReserveData, setPastReserveData] = useState([]);
  const [upcomingReserveData, setUpcomingReserveData] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  
  useEffect(() => {
    if(loginUser.is_logined){

      getTravelLoad.getReservePastRead({nowpage: 1, mymode: false})
      .then(res => {
        setPastReserveData(res);
      })
      .catch(e => {
        console.log(e);
      });

      getTravelLoad.getReserveUpcomingRead({nowpage: 1, mymode: false})
      .then(res => {
        setUpcomingReserveData(res);
      })
      .catch(e => {
        console.log(e);
      });
    }
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
        <Wrap>
          <Title>나의 숙소 예약관리</Title>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="upcoming">현재 예약 목록</option>
              <option value="past">지난 예약 목록</option>
            </Select>
        </Wrap>
          {filter === 'upcoming' ? (
          <MyAccCategory
            title="현재 예약 목록"
            reserveData={upcomingReserveData}
            NoAccReserve={<NoAccReserve />}
          />
        ) : (
          <MyAccCategory
            title="지난 예약 목록"
            reserveData={pastReserveData}
          />
        )}
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default MyAccReservePage;
