//나의숙소 예약관리 예약카드 중 지난예약과 다가오는예약 구분하는 컴포넌트
import React, { useState } from "react";
import styled from "styled-components";
import ReserveCard from "./ReserveCard";
import Pagination from "./Pagination";
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

//예약 있으면 여행카드 가져와서 배열, 없으면 예약 없음 안내
const MyAccCategory = ({ title, reserveData, NoAccReserve, onDataUpdate }) => {
  const itemsPerPage = 6; //한페이지에 6개씩
  const [currentPage, setCurrentPage] = useState(1); // 현재페이지 기본값 1
 // 1개 체크 박스 상태(nanoid : value)
 const [checkValue, setCheckValue] = useState([]);

 // 확인 모달 상태
 const [isModal, setIsModal] = useState(false);

  //페이지수 계산
  const totalPages = Math.ceil(reserveData.length / itemsPerPage);

  //현재 페이지 아이템 시작,끝 계산
  const currentItems = reserveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            {currentItems.map((item, i) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
