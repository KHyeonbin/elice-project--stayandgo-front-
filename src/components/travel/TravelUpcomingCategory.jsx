import React, {useCallback, useState} from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";
import {Checkbox} from 'antd';
import { travelDeleteFromCheck } from "../../api/travelDeleteFromCheck";

const CategoryBox = styled.div`
  display: flex;
  margin-left: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
const Pagenation_div = styled.div`
    width: 100%;
    font-size: 17px;
    margin: 0 auto;
    margin-bottom: 100px;
`
const Pagenation_ul = styled.ul`
    width: 100%;
    height: 100%;
    // ul list 그룹의 기본 들여쓰기 제거 (padding-left 0)
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Pagenation_span = styled.span`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;
    color: #797979;
 
    &:hover {
        color: #E61E51;
    }
`
const Pagenation_li = styled.li`
    width: 10px;
    list-style: none;
    cursor: pointer;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }
`
// antd 체크박스 그룹 css style 정의
const CheckboxGroup = styled(Checkbox.Group)`
`
const CheckboxOption = styled(Checkbox)`
    // 체크'박스' css 
    .ant-checkbox-input:checked + .ant-checkbox-inner {
        background-color: #E61E51;
        border: 1px solid #F0586F;
    }
`
// 삭제 버튼 div
const DelDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
`
// 삭제 버튼
const CheckDelBtn = styled.button`
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: #E61E51;
    transition: background-color 1s;
    cursor: pointer;
    color: white;

    &:hover{
        background-color: #F0586F;
    }
`

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const TravelUpcomingCategory = ({ setSelectValue, upcomingTravelData, noReservation, setUpcomingPage, upcomingPage }) => {
  // 1개 체크 박스 상태(nanoid : value)
  const [checkValue, setCheckValue] = useState([]);

  // upcomingPage
  // page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
  // 5 페이지만 출력하여야 함
  // 테스트로 2 개 씩 2 페이지 출력으로 체크 중
  const upcomingPagenationing = useCallback(() => {
    const pageArray = [];
    // 페이지 시작점 계산
    let remainpage = upcomingPage.page;
    let count = 0;
    while((remainpage - count) % 5 !== 1){
        count++;
    }
    const startpage = upcomingPage.page - count;
    // 페이지 끝점 계산
    remainpage = startpage + 4;
    if(remainpage > upcomingPage.totalPage){
        remainpage = upcomingPage.totalPage;
    }
    const lastpage = remainpage;
    for(let i = startpage;i <= lastpage; i++){
        pageArray.push(i);
    }
    return pageArray;
  },[upcomingPage]);
  // 선택한 페이지로 이동 기능
  const upcomingPagenateHandle = (i) => {
      setUpcomingPage((current) => {
          const newPage = {...current};
          newPage.page = i;
          return newPage;
      });
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });   
  };
  // 이전 버튼 클릭 시 최대 5 페이지 이동 기능
  const upcomingPagePrevHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 첫 페이지로)
      let i = upcomingPage.page - 5;
      if(i < 1){
          i = 1;
      }
      setUpcomingPage((current) => {
          const newPage = {...current};
          newPage.page = i;
          return newPage;
      });
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  };
  // 다음 버튼 클릭 시 최대 5 페이지 이동 기능
  const upcomingPageNextHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
      let i = upcomingPage.page + 5;
      if(i > upcomingPage.totalPage){
          i = upcomingPage.totalPage;
      }
      setUpcomingPage((current) => {
          const newPage = {...current};
          newPage.page = i;
          return newPage;
      });
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  };

  // checkbox 1개 씩 선택 가능하다.
  const onChangeCheckbox = (e) => {
    if(e.length > 1){
        alert("다가오는 여행은 -2 일 전까지 1개 씩 삭제 가능합니다.");
        return;
    }
    setCheckValue(e);
  };

  // 체크 1개 지정 후 삭제 버튼
  const onClickDelete = () => {
    if(checkValue.length === 0){
        alert("취소할 여행을 체크해주세요.");
        return;
    }
    travelDeleteFromCheck({nanoid: checkValue[0]})
    .then(res => {
        if(res.data && res.data.code === 200){
            alert('정상적으로 취소되었습니다.');
            // 유사 새로고침 효과 부여
            setSelectValue({value: "다가오는 여행", label: "다가오는 여행"});
            return;
        }
    })
    .catch(e => {
        console.log(e.response?.data?.message);
    });
  }

  return (
    <>
      {upcomingTravelData.length > 0 && (
        <>
          <CategoryBox>
            <DelDiv>
                <CheckDelBtn onClick={onClickDelete}>취소</CheckDelBtn>
            </DelDiv>
            <CheckboxGroup value={checkValue} onChange={onChangeCheckbox}>
            {upcomingTravelData.map((item, i) => (
                <>
                    <TravelCard
                    key={i}
                    title={item.title}
                    name={item.host_nickname}
                    startDate={item.start_date}
                    endDate={item.end_date}
                    totalPrice={item.amount}
                    main_image={item.main_image}
                    sub_images={item.sub_images}
                    adult={item.adult}
                    child={item.child}
                    baby={item.baby}
                    />
                    <CheckboxOption key={i+1} value={item.nanoid} />
                </>
            ))}
            </CheckboxGroup>
          </CategoryBox>
          <Pagenation_div>
              <Pagenation_ul>
                  <Pagenation_span onClick={upcomingPagePrevHandle}>{"<<"}</Pagenation_span>
                      {
                        upcomingPagenationing().map((v,i) => {
                          return (
                              <Pagenation_li key={i} onClick={() => upcomingPagenateHandle(v)} style={upcomingPage.page === v ? {fontWeight: "bold", color: "#E61E51"} : {fontWeight: "400", color: "#797979"}}>{v}</Pagenation_li>
                          );
                        })
                      }
                <Pagenation_span onClick={upcomingPageNextHandle}>{">>"}</Pagenation_span>
              </Pagenation_ul>
          </Pagenation_div>
        </>
      ) 
      || 
      (
        noReservation
      )}
    </>
  );
};

export default TravelUpcomingCategory;