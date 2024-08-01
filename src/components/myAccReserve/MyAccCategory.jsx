//나의숙소 예약관리 예약카드 중 지난예약과 다가오는예약 구분하는 컴포넌트
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ReserveCard from "./ReserveCard";
import { Button } from 'antd';
import { travelDeleteFromCheck } from "../../api/travelDeleteFromCheck";
import ProfileModal from "../profile/ProfileModal";

const Container = styled.div`
padding: 15px 0;
width: 100%;
`;
const CategoryTitle = styled.h2`
  font-size: 20px;
  margin: 5px 0 5px 15px;
  width: 200px;
`;
const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const StyledButton = styled(Button)`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: #E61E51;
  transition: background-color 1s;
  cursor: pointer;
  padding: 1px 6px;
  margin-right: 15px;
  color: white;
`
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

//예약 있으면 여행카드 가져와서 배열, 없으면 예약 없음 안내
const MyAccCategory = ({ title, reserveData, NoAccReserve, onDataUpdate, page, setPage }) => {
  const [checkValue, setCheckValue] = useState([]);
  const [isModal, setIsModal] = useState(false);

  // checkbox 1개 씩 선택 가능하다.
  const onChangeCheckbox = (id) => {
    setCheckValue((prevCheckValue) =>
      prevCheckValue.includes(id)
        ? prevCheckValue.filter((item) => item !== id)
        : [id] // 체크박스는 하나만 선택되므로 배열로 설정
     );
  };

// 체크 1개 지정 후 삭제 버튼
const onClickDelete = () => {
  if(checkValue.length === 0){
      alert("삭제할 여행을 체크해주세요.");
      return;
  }
  setIsModal(true);
}

/** 여행 취소 취소 */
const onClickHandleCancelDelete = () => {
  setIsModal(false);
};

  /** 여행 취소 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      const res = await travelDeleteFromCheck({ nanoid: checkValue[0], mymode: false });
      if (res.data && res.data.code === 200) {
        alert('정상적으로 삭제되었습니다.');
        setIsModal(false);
        setCheckValue([]);
        await onDataUpdate(); // 데이터 새로 고침
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  // page
  // page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
  // 5 페이지만 출력하여야 함
  // 테스트로 2 개 씩 2 페이지 출력으로 체크 중
  const pagenationing = useCallback(() => {
    const pageArray = [];
    // 페이지 시작점 계산
    let remainpage = page.page;
    let count = 0;
    while((remainpage - count) % 5 !== 1){
        count++;
    }
    const startpage = page.page - count;
    // 페이지 끝점 계산
    remainpage = startpage + 4;
    if(remainpage > page.totalPage){
        remainpage = page.totalPage;
    }
    const lastpage = remainpage;
    for(let i = startpage;i <= lastpage; i++){
        pageArray.push(i);
    }
    return pageArray;
  },[page]);
  // 선택한 페이지로 이동 기능
  const pagenateHandle = (i) => {
      setPage((current) => {
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
  const pagePrevHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 첫 페이지로)
      let i = page.page - 5;
      if(i < 1){
          i = 1;
      }
      setPage((current) => {
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
  const pageNextHandle = () => {
      // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
      let i = page.page + 5;
      if(i > page.totalPage){
          i = page.totalPage;
      }
      setPage((current) => {
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
      {reserveData.length > 0 ? (
        <Container>
          <FilterContainer>
            <CategoryTitle>{title}</CategoryTitle>
            <StyledButton onClick={onClickDelete}> 선택 삭제
            </StyledButton>
          </FilterContainer>
          <CategoryBox>
            {reserveData.map((item, i) => (
              <ReserveCard
                key={i}
                id={item._id}
                title={item.title}
                author={item.author.name}
                startDate={item.start_date}
                endDate={item.end_date}
                amount={item.amount}
                main_image={item.main_image}
                sub_images={item.sub_images}
                adult={item.adult}
                child={item.child}
                baby={item.baby}
                create_at={item.create_at}
                onCheckboxChange={() => onChangeCheckbox(item.nanoid)}
                isChecked={checkValue.includes(item.nanoid)}
           />
            ))}
          </CategoryBox>
          <Pagenation_div>
              <Pagenation_ul>
                  <Pagenation_span onClick={pagePrevHandle}>{"<<"}</Pagenation_span>
                      {
                        pagenationing().map((v,i) => {
                          return (
                              <Pagenation_li key={i} onClick={() => pagenateHandle(v)} style={page.page === v ? {fontWeight: "bold", color: "#E61E51"} : {fontWeight: "400", color: "#797979"}}>{v}</Pagenation_li>
                          );
                        })
                      }
                <Pagenation_span onClick={pageNextHandle}>{">>"}</Pagenation_span>
              </Pagenation_ul>
          </Pagenation_div>
          {isModal && (
            <ProfileModal
              message="정말 취소하시겠습니까?"
              onConfirm={onClickHandleConfirmDelete}
              onCancel={onClickHandleCancelDelete}
            />
          )}
        </Container>
      ) : (
        NoAccReserve
      )}
    </>
  );
};

export default MyAccCategory;
