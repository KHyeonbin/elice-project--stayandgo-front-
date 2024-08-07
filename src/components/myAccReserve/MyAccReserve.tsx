//나의숙소 예약관리 페이지
//Reserve(필터링 및 데이터불러오기) > Category(현재예약, 이전예약 구분 및 페이지네이션) > Card(예약 개별항목 체크박스) , NoAcc(예약없을때)
import React, { useState, useEffect, useCallback } from "react";
import Select from 'react-select';
import { useRecoilValue } from "recoil";
import loginState from "../../atoms/loginState";
import getTravelLoad from "../../api/getTravelLoad";
import MyAccCategory from "./MyAccCategory";
import NoAccReserve from "./NoAccReserve";
import { Container, SelectDiv, selectCustom } from "./MyAccReserve.style";
import { ReserveData } from "../../model/profile/myaccReserve"

const MyAccommodationReserve: React.FC = () => {
  const loginUser = useRecoilValue(loginState);
  const [pastReserveData, setPastReserveData] = useState<ReserveData[]>([]);
  const [upcomingReserveData, setUpcomingReserveData] = useState<ReserveData[]>([]);

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

  //데이터 가져오기
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

  const handleDataUpdate = useCallback(async () => {
    await fetchData(); // 데이터 새로 고침
  }, [fetchData]);

  const onChangeSelect = useCallback((e) => {
    setSelectValue(e);
    setUpcomingPage((current) => ({ ...current, page: 1 }));
    setPastPage((current) => ({ ...current, page: 1 }));
  }, []);


  return (
    <>
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
              NoAccReserve={<NoAccReserve />}
              page={pastPage}
              setPage={setPastPage}
            />
          )}
        </Container>
    </>
  );
};

export default MyAccommodationReserve;
