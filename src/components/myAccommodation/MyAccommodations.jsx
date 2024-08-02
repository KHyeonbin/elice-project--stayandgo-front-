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

  // 로그인 확인 상태 추가
  const [isLoginChecked, setIsLoginChecked] = useState(false);

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
      setAccommodations(res || []); // 데이터가 없을 때 빈 배열로 설정
      setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
      setIsLoginChecked(true); // 데이터 로드 후 로그인 상태 확인
    })
    .catch(e => {
      console.error("숙소 데이터를 불러오는데 실패했습니다.", e);
      setIsLoading(false); // 에러 발생 시에도 로딩 상태 해제
      setIsLoginChecked(true); // 에러 발생 시에도 로그인 상태 확인
    });
    setIsLoading(true);
     // 강제 로딩 효과 부여로 settimeout 사용
      setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  /** 나의 숙소 데이터 가져오기 */
  useEffect(() => {
    if (loginUser.is_logined) {
      loadingFunction();
    } else {
      loadingFunction();
    }
  }, [loginUser.is_logined]);

  // 로그인 확인 후 경고창과 리다이렉트 처리
  useEffect(() => {
    if (isLoginChecked && !loginUser.is_logined) {
      alert('로그인이 필요한 페이지입니다.');
      window.location.href = "/";
    }
  }, [isLoginChecked, loginUser.is_logined, navigate]);

  /** 체크박스 클릭 시 해당 숙소 checked 상태 변경 */
  const onChangeHandleCheckBox = (e) => {
    if (e.length > 1) {
      alert("등록 삭제 및 수정은 1 개씩 가능합니다.");
      return;
    }
    setCheckValue(e);
    return;
  };

  /** 등록 삭제 버튼 클릭 시 */
  const onClickHandleDelete = () => {
    if (checkValue.length === 0) {
      alert("삭제할 숙소를 체크해주세요.");
      return;
    }
    setIsModal(true);
  };

  /** 수정 버튼 클릭 시 */
  const onClickHandleEdit = () => {
    if (checkValue.length === 0) {
      alert("수정할 숙소를 체크해주세요.");
      return;
    }
    navigate('/upload/edit', { state: { v: checkValue[0] } });
    // 체크 벨류 초기화
    setCheckValue([]);
    return;
  };

  /** 숙소 삭제 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };

  /** 숙소 삭제 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      mypostDelete({ nanoid: checkValue[0] })
      .then(res => {
        if (res.data && res.data.code === 200) {
          loadingFunction();
          // 체크 벨류 초기화
          setCheckValue([]);
        } else {
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

  if (isLoading) {
    return (
      <Loading_div>
        <Loading_img src={loading} style={{ animation: "spin 0.5s 3 linear" }} />
      </Loading_div>
    );
  }

  return (
    <Container>
      {!isModal &&
        <>
          <Header>
            <Button onClick={onClickHandleDelete}>삭제</Button>
            <Button onClick={onClickHandleEdit}>수정</Button>
          </Header>
          <CheckboxGroup value={checkValue} onChange={onChangeHandleCheckBox}>
            {accommodations.map((accommodation, i) => (
              <AccommodationItem
                key={i}
                accommodation={accommodation}
                onChangeHandleCheckBox={onChangeHandleCheckBox}
                CheckboxOption={CheckboxOption}>
              </AccommodationItem>
            ))}
          </CheckboxGroup>
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
