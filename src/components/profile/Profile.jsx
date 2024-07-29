import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginState from "../../atoms/loginState";
import { useRecoilValue } from "recoil";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileName,
  ProfileSection,
  ProfileLabel,
  ProfileEdit,
  ProfileDelete,
  ProfileLogout,
} from "./ProfilePageStyle";
import ProfileModal from "./ProfileModal"; // 수정된 모달 컴포넌트
import { fetchEditUserData, deleteUser } from "../../api/profile"; // 분리한 api 함수 가져오기
import { logoutUser } from "../../api/logoutUser";

const Profile = () => {
  // user 전역 상태(app.jsx 에서 체크됨) 확인
  const user = useRecoilValue(loginState);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 모달 상태 추가

  const navigate = useNavigate(); // 페이지 이동하기 위해 사용

  useEffect(() => {
    /** 유저 데이터 가져오는 함수 */
    const getUserData = async () => {
      try {
        const userData = await fetchEditUserData();
        setUser(userData);
      } catch (error) {
        console.error("유저의 데이터를 찾을 수 없습니다.", error);
      }
    };

    getUserData();
  }, []);

  /** 개인정보 수정 페이지로 이동 */
  const onClickHandleProfileEdit = () => {
    navigate(`/profile/edit/${user.id}`);
  };

  /** 회원 탈퇴 버튼 클릭 시 모달 열기 */
  const onClickHandleProfileDelete = () => {
    setIsDeleteModalOpen(true);
  };

  /** 회원 탈퇴 취소 */
  const onClickHandleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  /** 회원 탈퇴 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      await deleteUser(user.id); // 주석처리 후 탈퇴성공 테스트 확인 가능
      setIsDeleteModalOpen(false);
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("회원 탈퇴에 실패했습니다.", error);
    }
  };

  /** 로그아웃 버튼 클릭 시 홈으로 이동 */
  const onClickHandleProfileLogout = () => {
    logoutUser()
    .then(res => {
        if(res?.data && res.data.code === 200){
            window.location.href = '/';
        } else {
            alert("로그아웃 오류가 발생하였습니다.");
        }
    });
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={user.profileImage} alt="Profile" />
        <ProfileName>{user.name}</ProfileName>
      </ProfileHeader>
      <ProfileSection>
        <ProfileLabel onClick={onClickHandleProfileEdit}>개인정보 수정</ProfileLabel>
        <ProfileEdit onClick={onClickHandleProfileEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </ProfileEdit>
      </ProfileSection>
      <ProfileSection>
        <ProfileDelete onClick={onClickHandleProfileDelete}>회원 탈퇴</ProfileDelete>
      </ProfileSection>
      <ProfileLogout onClick={onClickHandleProfileLogout}>로그아웃</ProfileLogout>

      {isDeleteModalOpen && (
        <ProfileModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={onClickHandleConfirmDelete}
          onCancel={onClickHandleCancelDelete}
        />
      )}
    </ProfileContainer>
  );
};

export default Profile;
