//나의숙소 예약관리 예약카드 중 지난예약과 다가오는예약 구분하는 컴포넌트
import React, { useState } from "react";
import ReserveCard from "./MyAccReserveCard";
import Pagination from "./Pagination";
import ProfileModal from "../profile/ProfileModal";
import { travelDeleteFromCheck } from "../../api/travelDeleteFromCheck";
import * as Cate from "./MyAccCategory.style";


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

  // 체크 1개 지정 후 삭제 
  const onClickDelete = () => {
    if(checkValue.length === 0){
        alert("삭제할 여행을 체크해주세요.");
        return;
    }
    setIsModal(true);
  }

  /** 여행 삭제하기 모달창에서 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      const res = await travelDeleteFromCheck({ nanoid: checkValue[0], mymode: false });
      if (res.data && res.data.code === 200) {
        alert('정상적으로 삭제되었습니다.');
        setIsModal(false);
        await onDataUpdate(); // 데이터 새로 고침
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

   /** 여행 삭제하기 모달창에서 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };


  return (
    <>
      {reserveData.length > 0 ? (
        <Cate.Container>
          <Cate.FilterContainer>
            <Cate.CategoryTitle>{title}</Cate.CategoryTitle>
            <Cate.StyledButton onClick={onClickDelete}> 선택 삭제
            </Cate.StyledButton>
          </Cate.FilterContainer>
          <Cate.CategoryBox>
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
          </Cate.CategoryBox>
          <Pagination page={page} setPage={setPage} />
          {isModal && (
            <ProfileModal
              message="정말 취소하시겠습니까?"
              onConfirm={onClickHandleConfirmDelete}
              onCancel={onClickHandleCancelDelete}
            />
          )}
        </Cate.Container>
      ) : (
        NoAccReserve
      )}
    </>
  );
};

export default MyAccCategory;
