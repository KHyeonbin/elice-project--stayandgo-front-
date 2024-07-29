import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "엘리스",
    email: "elice@test.com",
    profileImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/e6b26733-2c15-47d9-b097-6968b39bb697.jpeg?im_w=1440&im_q=highq",
  });
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
    // 토큰삭제?
    console.log("로그아웃");
    navigate("/");
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
