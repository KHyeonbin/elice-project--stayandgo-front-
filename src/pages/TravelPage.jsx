import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import NoReservation from "../components/travel/NoReservation";
import TravelCategory from "../components/travel/TravelCategory";
import TravelUpcomingCategory from "../components/travel/TravelUpcomingCategory";
import getTravelLoad from "../api/getTravelLoad";
import loading from "../assets/icons/loading.png";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import footerState from "../atoms/footerState";

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
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
`;
const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 0 0 15px;
  width: 320px;
`;
const Loading_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40%;
`
const Loading_img = styled.img`
    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`

const TravelPage = () => {
  //로그인 상태 확인
  const loginUser = useRecoilValue(loginState);
  const navigate = useNavigate();

  // 메뉴 상태 체크
  const menu = useRecoilValue(footerState);
  const setMenu = useSetRecoilState(footerState);

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
  // 로딩 상태 정의
  const [isingLoading, setIsIngLoading] = useState(false);
  const [isPastLoading, setIsPastLoading] = useState(false);
  //오늘 날짜 기준으로 지난여행, 다가오는여행 상태 세팅
  const [pastTravelData, setPastTravelData] = useState([]);
  const [upcomingTravelData, setUpcomingTravelData] = useState([]);

  // react-select 에는 key 값이 없어서 미리 option 정의
  const option = [{value: "다가오는 여행", label: "다가오는 여행"},
                  {value: "지난 여행", label: "지난 여행"}];
  // react-select box value 설정하기 위함
  const [selectValue, setSelectValue] = useState(option[0]);

  // 첫 화면 진입
  useEffect(() => {
    if(!loginUser.is_logined){
      alert('로그인이 필요한 페이지입니다.');
      setMenu((current) => {
        const newMenu = {...current};
        newMenu.menu = menu.menuArr[0];
        return newMenu;
      });
      setTimeout(() => {
        navigate('/');
      }, 150);
      return;
    }
  },[])

  useEffect(() => {
    if(loginUser.is_logined){
      // page
      getTravelLoad.getReservePastPage({mymode: true})
      .then(res => {
        setPastPage(res);
      })
      .catch(e => {
        console.log(e);
      });
      getTravelLoad.getReserveUpcomingPage({mymode: true})
      .then(res => {
        setUpcomingPage(res);
      })
      .catch(e => {
        console.log(e);
      });
      // list
      getTravelLoad.getReservePastRead({nowpage: 1, mymode: true})
      .then(res => {
        setPastTravelData(res);
      })
      .catch(e => {
        console.log(e);
      });
      getTravelLoad.getReserveUpcomingRead({nowpage: 1, mymode: true})
      .then(res => {
        setUpcomingTravelData(res);
      })
      .catch(e => {
        console.log(e);
      });
      setIsIngLoading(true);
      setIsPastLoading(true);
      setTimeout(() => {
        setIsIngLoading(false);
        setIsPastLoading(false);
      }, 350);
    }
  },[selectValue]);

  // 현재 여행 페이지 컨트롤
  useEffect(() => {
    if(loginUser.is_logined){
      getTravelLoad.getReserveUpcomingRead({nowpage: upcomingPage.page, mymode: true})
      .then(res => {
        setUpcomingTravelData(res);
      })
      .catch(e => {
        console.log(e);
      });
      setIsIngLoading(true);
      setTimeout(() => {
        setIsIngLoading(false);
      }, 250);
    }
  },[upcomingPage.page]);

  // 지난 여행 페이지 컨트롤
  useEffect(() => {
    if(loginUser.is_logined){
      getTravelLoad.getReservePastRead({nowpage: pastPage.page, mymode: true})
      .then(res => {
        setPastTravelData(res);
      })
      .catch(e => {
        console.log(e);
      });
      setIsPastLoading(true);
      setTimeout(() => {
        setIsPastLoading(false);
      }, 250);
    }
  },[pastPage.page]);

  // 지난 여행 또는 다가오는 여행 선택지
  const onChangeSelect = (e) => {
    setSelectValue(e);
  };


  return (
    <>
      <Header user={loginUser} />
      <SelectDiv>
        <Select styles={selectCustom} options={option} onChange={onChangeSelect} value={selectValue} />
      </SelectDiv>
      
      <MainContainer>
      <Container style={selectValue.value === "다가오는 여행" ? {display:"block"} : {display:"none"}}>
        <Title>다가오는 여행</Title>
        {isingLoading &&
          <Loading_div>
          <Loading_img src={loading} style={{animation: "spin 0.5s 3 linear"}} />
          </Loading_div>
        ||
          <TravelUpcomingCategory setSelectValue={setSelectValue} upcomingPage={upcomingPage} setUpcomingPage={setUpcomingPage} title="다가오는 여행" upcomingTravelData={upcomingTravelData} noReservation={<NoReservation />}/>
        }
      </Container>
      <Container style={selectValue.value === "지난 여행" ? {display:"block"} : {display:"none"}}>
        <Title>지난 여행</Title>
        {isPastLoading &&
          <Loading_div>
            <Loading_img src={loading} style={{animation: "spin 0.5s 3 linear"}} />
          </Loading_div>
        ||
          <TravelCategory pastPage={pastPage} setPastPage={setPastPage} title="지난 여행" pastTravelData={pastTravelData} noReservation={<NoReservation />}/>
        }
      </Container>
      </MainContainer>
      <Footer user={loginUser} />
    </>
  );
};

export default TravelPage;
