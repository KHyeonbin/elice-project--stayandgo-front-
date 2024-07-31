import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Button,
  CheckboxGroup,
  CheckboxOption,
  Loading_div,
  Loading_img
} from "./MyAccommodationsStyle";
import loading from "../../assets/icons/loading.png";
import { useNavigate } from "react-router-dom";
import AccommodationItem from "./AccommodationItem"; // 분리한 숙소아이템 컴포넌트 가져오기
import mainPostLoad from "../../api/mainPostLoad";
import { useRecoilValue } from "recoil";
import loginState from "../../atoms/loginState";
import { mypostDelete } from "../../api/myPostDelete";
import ProfileModal from "../profile/ProfileModal";

const MyAccommodations = () => {
  // 페이지 진입 시 로그인 하지 않았을 경우 예외처리 추가
  const loginUser = useRecoilValue(loginState);

  // modal 호출 state
  const [isModal, setIsModal] = useState(false);
  // 로딩 state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // 나의 숙소 state
  const [accommodations, setAccommodations] = useState([]);
  // checkbox state
  const [checkValue, setCheckValue] = useState([]);

  // 첫 페이지 load 나 삭제 시 재 loading 을 위한 함수 셋팅
  const loadingFunction = () => {
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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  /** 나의 숙소 데이터 가져오기 */
  useEffect(() => {
    if(!loginUser.is_logined){
      alert("로그인이 필요한 페이지입니다.");
      navigate('/');
      return;
    }
    loadingFunction();
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

  /** 등록 삭제 버튼 클릭 시 */
  const onClickHandleDelete = () => {
    setIsModal(true)
  };

  /** 수정 버튼 클릭 시 */
  const onClickHandleEdit = () => {
    navigate('/upload/edit', { state: { v: checkValue[0] } });
    return;
  };

  /** 숙소 삭제 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };

  /** 숙소 삭제 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      mypostDelete({nanoid: checkValue[0]})
      .then(res => {
        if(res.data && res.data.code === 200){
          loadingFunction();
        } 
        else {
          alert(res?.data?.message);
        }
      })
      .catch(e => {
        console.log(e);
      });
      setIsModal(false);
      return;
    } catch (error) {
      console.error("숙소 삭제에 실패했습니다.", error);
      alert("숙소 삭제에 실패했습니다.");
      return;
    }
  };

  return (
    <Container>
    {!isModal &&
      <>
      <Header>
        <Button key={1} onClick={onClickHandleDelete} disabled={checkValue.length !== 1}>삭제</Button>
        <Button key={2} onClick={onClickHandleEdit} disabled={checkValue.length !== 1}>수정</Button>
      </Header>
      {!isLoading &&
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
      ||
          <Loading_div>
            <Loading_img src={loading} style={{animation: "spin 0.5s 3 linear"}} />
          </Loading_div>
        }
      </>
    ||
      <ProfileModal
      message="정말 삭제하시겠습니까?"
      onConfirm={onClickHandleConfirmDelete}
      onCancel={onClickHandleCancelDelete}
      />
    }      
    </Container>
  );
}
export default MyAccommodations;
