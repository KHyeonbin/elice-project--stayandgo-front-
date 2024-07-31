import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Button,
  CheckboxGroup,
  CheckboxOption
} from "./MyAccommodationsStyle";
import { useNavigate } from "react-router-dom";
import AccommodationItem from "./AccommodationItem"; // 분리한 숙소아이템 컴포넌트 가져오기
import mainPostLoad from "../../api/mainPostLoad";

const MyAccommodations = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [checkValue, setCheckValue] = useState([]);

  /** 나의 숙소 데이터 가져오기 */
  useEffect(() => {
    // 기존 메인에서 post read 하는 api 를 mymode 값으로 제어하기 때문에 나머지 값들은 기본 값으로 셋팅
    const search = {
      city: "전체",
      adult: 0,
      child: 0,
      baby: 0
    };
    mainPostLoad.getPostsRead({nowpage: 1, search, category: "전체", mymode: true})
    .then(res => {
      setAccommodations(res);
    })
    .catch(e => {
      console.error("숙소 데이터를 불러오는데 실패했습니다.", e);
    });
  }, []);

  /** 각 숙소 클릭 시 상세 페이지로 이동 */
  const onClickHandleDetail = (nanoid) => {
    navigate(`/room/my/details/${nanoid}`);
    return;
  };

  /** 체크박스 클릭 시 해당 숙소 checked 상태 변경 */
  const onChangeHandleCheckBox = (e) => {
    if(e.length > 1){
      alert("등록 삭제 및 수정은 1 개씩 가능합니다.");
      return;
    }
    setCheckValue(e);
    return;
  };

  /** 등록삭제 버튼 클릭 시 */
  const onClickHandleDelete = () => {
    

  };

  /** 수정 버튼 클릭 시 */
  const onClickHandleEdit = () => {
    navigate('/upload/edit', { state: { v: checkValue[0] } });
    return;
  };

  return (
    <Container>
      <Header>
        <Button key={1} onClick={onClickHandleDelete} disabled={checkValue.length !== 1}>삭제</Button>
        <Button key={2} onClick={onClickHandleEdit} disabled={checkValue.length !== 1}>수정</Button>
      </Header>
        <CheckboxGroup value={checkValue} onChange={onChangeHandleCheckBox}>
          {accommodations.map((accommodation, i) => (
            <AccommodationItem
            keys={i}
            accommodation={accommodation}
            onClickHandleDetail={onClickHandleDetail}
            onChangeHandleCheckBox={onChangeHandleCheckBox}
            CheckboxOption={CheckboxOption}>
            </AccommodationItem>
          ))}
        </CheckboxGroup>
    </Container>
  );
};

export default MyAccommodations;
