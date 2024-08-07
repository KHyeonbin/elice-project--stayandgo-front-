//나의숙소 예약관리 예약카드 중 지난예약과 다가오는예약 구분하는 컴포넌트
import React, { useState } from "react";
import ReserveCard from "./MyAccReserveCard";
import Pagination from "../layout/Pagination";
import MyAccReserveModal from "./MyAccReserveModal";
import { travelDeleteFromCheck } from "../../api/travelDeleteFromCheck";
import * as Cate from "./MyAccCategory.style";
import {MyAccCategoryProps} from "../../model/profile/myaccReserve"


//예약 있으면 여행카드 가져와서 배열, 없으면 예약 없음 안내
const MyAccCategory: React.FC<MyAccCategoryProps> = ({ title, reserveData, NoAccReserve, onDataUpdate, page, setPage }) => {
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);

  // checkbox 1개 씩 선택 가능하다.
  const onChangeCheckbox = (id:string) => {
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
      const res = await travelDeleteFromCheck({ nanoid: checkValue[0]});
      if (res?.data && res.data.code === 200) {
        alert('정상적으로 취소되었습니다.');
        setIsModal(false);
        await onDataUpdate(); // 데이터 새로 고침
      }
    } catch (e) {
      console.log(e.response?.data?.message);
      setCheckValue([]);
    }
    setIsModal(false);
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
            {title === "현재 예약 목록" && (
              <Cate.Button onClick={onClickDelete}> 취소 </Cate.Button>
            )}
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
                onCheckboxChange={title === "현재 예약 목록" ? () => onChangeCheckbox(item.nanoid) : undefined}
                isChecked={checkValue.includes(item.nanoid)}
                showCheckbox={title === "현재 예약 목록"}
           />
            ))}
          </Cate.CategoryBox>
          <Pagination page={page} setPage={setPage} />
          {isModal && (
            <MyAccReserveModal
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
