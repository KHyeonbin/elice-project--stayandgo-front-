//나의숙소 예약관리 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import NoAccReserve from "../components/myAccReserve/NoAccReserve";
import MyAccCategory from "../components/myAccReserve/MyAccCategory";
import getTravelLoad from "../api/getTravelLoad";
import Select from 'react-select';
import { motion } from "framer-motion";

const Container = styled.div`
  padding-bottom: 60px;
`;
const SelectDiv = styled.div`
  display: flex;
  justify-content: end;
  width: calc(100% - 30px);
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 15px auto 0;
  & > div {
    width: 100%;
    border-radius: 10px;
    > div {
      width: 100%;
      border-radius: 10px;
    }
  };
`
// react-select css
const selectCustom = {
  option: (provided, state) => {
    let backgroundColor = 'white';
    let color = '#333';
    if(state.isSelected){
        backgroundColor = '#F0586F';
        color = 'white';
    } else if(state.isFocused){
        backgroundColor = '#F07C8C';
        color = 'white';
    }
  return {
    ...provided,
    backgroundColor,
    color,
    padding: 20,
    border: "none" 
  }},
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: 'none',
    width: "220px",
  }),
  menu: (provided) => ({
    ...provided,
    border: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
  }),
};


const MyAccReservePage = () => {
  //로그인 상태 확인
  const loginUser = useRecoilValue(loginState);

  //오늘 날짜 기준으로 지난예약, 다가오는예약 상태 세팅
  const [pastReserveData, setPastReserveData] = useState([]);
  const [upcomingReserveData, setUpcomingReserveData] = useState([]);

  // react-select 에는 key 값이 없어서 미리 option 정의
  const option = [{value: "현재 예약 목록", label: "현재 예약 목록"},
                  {value: "지난 예약 목록", label: "지난 예약 목록"}];
  // react-select box value 설정하기 위함
  const [selectValue, setSelectValue] = useState(option[0]);
  
   // 페이지네이션 정의 (초기 1페이지만 지정함(perPage 수정은 server 에서 담당)
  const [upcomingPage, setUpcomingPage] = useState({
    page: 1,
    perPage: 0,
    total: 0,
    totalPage: 0,
  });
  const [pastPage, setPastPage] = useState({
    page: 1,
    perPage: 0,
    total: 0,
    totalPage: 0,
  });


  const fetchData = async () => {
    try {
      const [pastData, upcomingData, pastPage, upcomingPage] = await Promise.all([
        getTravelLoad.getReservePastRead({ nowpage: 1, mymode: false }),
        getTravelLoad.getReserveUpcomingRead({ nowpage: 1, mymode: false }),
        getTravelLoad.getReservePastPage({mymode: false}),
        getTravelLoad.getReserveUpcomingPage({mymode: false})
      ]);
      setPastReserveData(pastData);
      setUpcomingReserveData(upcomingData);
      setPastPage(pastPage)
      setUpcomingPage(upcomingPage)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loginUser.is_logined) {
      fetchData();
    }
  }, [loginUser.is_logined]);

  // 현재 여행 페이지 컨트롤
  useEffect(() => {
    if(loginUser.is_logined){
      getTravelLoad.getReserveUpcomingRead({nowpage: upcomingPage.page, mymode: false})
      .then(res => {
        setUpcomingReserveData(res);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },[upcomingPage.page]);

  // 지난 여행 페이지 컨트롤
  useEffect(() => {
    if(loginUser.is_logined){
      getTravelLoad.getReservePastRead({nowpage: pastPage.page, mymode: false})
      .then(res => {
        setPastReserveData(res);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },[pastPage.page]);

  const handleDataUpdate = async () => {
    await fetchData(); // 데이터 새로 고침
  };

  const onChangeSelect = (e) => {
    setSelectValue(e);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, transform: 'translateX(100%)'}}
      animate={{ opacity: 1, transform: 'translateX(0)'}}
      transition={{ duration: 0.3 }}>
        <Header user={loginUser} />
        <SelectDiv>
          <Select styles={selectCustom} options={option} onChange={onChangeSelect} value={selectValue} />
        </SelectDiv>
  
        <Container>
          {selectValue.value === "현재 예약 목록" && (
            <MyAccCategory
              title="현재 예약 목록"
              reserveData={upcomingReserveData}
              onDataUpdate={handleDataUpdate}
              NoAccReserve={<NoAccReserve />}
              page={upcomingPage}
              setPage={setUpcomingPage}
            />
          )}
          {selectValue.value === "지난 예약 목록" && (
            <MyAccCategory
              title="지난 예약 목록"
              reserveData={pastReserveData}
              onDataUpdate={handleDataUpdate}
              page={pastPage}
              setPage={setPastPage}
            />
          )}
        </Container>
    </motion.div>
    <Footer user={loginUser} />
    </>
  );
};

export default MyAccReservePage;
