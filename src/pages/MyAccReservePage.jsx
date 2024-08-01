//나의숙소 예약관리 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
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

  //오늘 날짜 기준으로 지난예약, 다가오는예약 상태 세팅
  const [pastReserveData, setPastReserveData] = useState([]);
  const [upcomingReserveData, setUpcomingReserveData] = useState([]);
  const [filter, setFilter] = useState('upcoming');


  const fetchData = async () => {
    try {
      const [pastData, upcomingData] = await Promise.all([
        getTravelLoad.getReservePastRead({ nowpage: 1, mymode: false }),
        getTravelLoad.getReserveUpcomingRead({ nowpage: 1, mymode: false }),
      ]);
      setPastReserveData(pastData);
      setUpcomingReserveData(upcomingData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loginUser.is_logined) {
      fetchData();
    }
  }, [loginUser.is_logined]);

  const handleDataUpdate = async () => {
    await fetchData(); // 데이터 새로 고침
  };


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
            onDataUpdate={handleDataUpdate}
            NoAccReserve={<NoAccReserve />}
          />
        ) : (
          <MyAccCategory
            title="지난 예약 목록"
            reserveData={pastReserveData}
            onDataUpdate={handleDataUpdate}
          />
        )}
      </Container>
      <Footer user={loginUser} />
    </>
  );
};

export default MyAccReservePage;
