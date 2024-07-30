//여행카드 중 지난여행과 다가오는여행 구분하는 컴포넌트
import React, {useCallback} from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";

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

//예약 있으면 여행카드 가져와서 배열, 없으면 예약없음 안내
const TravelCategory = ({ pastTravelData, noReservation, pastPage, setPastPage }) => {
  // pastPage
  // page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
  // 5 페이지만 출력하여야 함
  // 테스트로 2 개 씩 2 페이지 출력으로 체크 중
  const pastPagenationing = useCallback(() => {
    const pageArray = [];
    // 페이지 시작점 계산
    let remainpage = pastPage.page;
    let count = 0;
    while((remainpage - count) % 5 !== 1){
        count++;
    }
    const startpage = pastPage.page - count;
    // 페이지 끝점 계산
    remainpage = startpage + 4;
    if(remainpage > pastPage.totalPage){
        remainpage = pastPage.totalPage;
    }
    const lastpage = remainpage;
    for(let i = startpage;i <= lastpage; i++){
        pageArray.push(i);
    }
    return pageArray;
  },[pastPage]);
  // 선택한 페이지로 이동 기능
  const pastPagenateHandle = (i) => {
      setPastPage((current) => {
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
  const pastPagePrevHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 첫 페이지로)
      let i = pastPage.page - 5;
      if(i < 1){
          i = 1;
      }
      setPastPage((current) => {
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
  const pastPageNextHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
      let i = pastPage.page + 5;
      if(i > pastPage.totalPage){
          i = pastPage.totalPage;
      }
      setPastPage((current) => {
          const newPage = {...current};
          newPage.page = i;
          return newPage;
      });
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  };

  return (
    <>
      {pastTravelData.length > 0 && (
        <>
          <CategoryBox>
            {pastTravelData.map((item, i) => (
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
            ))}
          </CategoryBox>
          <Pagenation_div>
              <Pagenation_ul>
                  <Pagenation_span onClick={pastPagePrevHandle}>{"<<"}</Pagenation_span>
                        {pastPagenationing().map((v,i) => {
                          return (
                              <Pagenation_li key={i} onClick={() => pastPagenateHandle(v)} style={pastPage.page === v ? {fontWeight: "bold", color: "#E61E51"} : {fontWeight: "400", color: "#797979"}}>{v}</Pagenation_li>
                          );
                      })}
                <Pagenation_span onClick={pastPageNextHandle}>{">>"}</Pagenation_span>
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

export default TravelCategory;
