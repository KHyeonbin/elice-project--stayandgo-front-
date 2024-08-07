import React, {useCallback, useState} from "react";
import styled from "styled-components";
import TravelCard from "./TravelCard";
import {Checkbox} from 'antd';
import { travelDeleteFromCheck } from "../../api/travelDeleteFromCheck";
import TravelConfirmModal from "./TravelConfirmModal";
import Pagination from "../layout/Pagination";
import { TravelUpcomingCategoryPropsType } from "../../model/travel/travel";

const CategoryBox = styled.div`
  display: flex;
  margin-left: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  & .ant-checkbox-group {
    width: 100%;
  }
`;
// antd 체크박스 그룹 css style 정의
const CheckboxGroup = styled(Checkbox.Group)`
`
const CheckboxOption = styled(Checkbox)`
    // 체크'박스' css 
    // 체크박스 크기
    .ant-checkbox-input {
        width: 24px;  
        height: 24px; 
    }
    .ant-checkbox-inner {
        width: 24px;  
        height: 24px; 
        border-radius: 4px; 
    }
    .ant-checkbox-inner:after {
        width: 5px; 
        height: 12px;
    }
    // 체크'박스' css 
    // input 체크 후 hover 시에도 배경, 테두리 유지
    // css 레벨에서 우선순위를 최상위로 높임 : !important
    .ant-checkbox-input:checked + .ant-checkbox-inner {
        background-color: #E61E51 !important;
        border: 1px solid #F0586F !important;
    }
`
// 삭제 버튼 div
const DelDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
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
const TravelUpcomingCategory:React.FC<TravelUpcomingCategoryPropsType> = ({ setSelectValue, upcomingTravelData, NoReservation, setUpcomingPage, upcomingPage }) => {
  // 1개 체크 박스 상태(nanoid : value)
  const [checkValue, setCheckValue] = useState<unknown[]>([]);

  // 확인 모달 상태
  const [isModal, setIsModal] = useState(false);

  // checkbox 1개 씩 선택 가능하다.
  const onChangeCheckbox = (e: unknown[]) => {
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
    setIsModal(true);
  }

  /** 여행 취소 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };

  /** 여행 취소 확인 */
  const onClickHandleConfirmDelete = async () => {
    travelDeleteFromCheck({nanoid: checkValue[0]})
        .then(res => {
            if(res?.data && res?.data.code === 200){
                alert('정상적으로 취소되었습니다.');
                // 유사 새로고침 효과 부여
                setSelectValue({value: "다가오는 여행", label: "다가오는 여행"});
            }
        })
        .catch(e => {
            console.log(e.response?.data?.message);
        });
        setIsModal(false);
        return;
    };

  return (
    !isModal &&
    <>
      {upcomingTravelData.length > 0 && (
        <>
          <CategoryBox>
            <>
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
            </>
          </CategoryBox>
          <Pagination page={upcomingPage} setPage={setUpcomingPage} />

        </>
      ) 
      || 
      (
        NoReservation
      )}
    </>
    ||
    <TravelConfirmModal
        message="정말 취소하시겠습니까?"
        onConfirm={onClickHandleConfirmDelete}
        onCancel={onClickHandleCancelDelete}
    />
  );
};

export default TravelUpcomingCategory;