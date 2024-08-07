import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginState from "../../atoms/loginState";
import { useRecoilValue } from "recoil";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileEmoji,
  ProfileName,
  ProfileSection,
  ProfileLabel,
  ProfileEdit,
  ProfileDelete,
  ProfileLogout,
} from "./ProfilePageStyle";
import ProfileModal from "./ProfileModal";
import { fetchUserData, deleteUser } from "../../api/profile"; // 분리한 api 함수 가져오기
import { logoutUser } from "../../api/logoutUser";
import { User } from "../../model/profile/profile"

const Profile: React.FC = () => {
  const user: User = useRecoilValue(loginState);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false); // 회원 탈퇴 모달 상태 추가
  const navigate = useNavigate(); // 페이지 이동하기 위해 사용

  useEffect(() => {
    /** 유저 데이터 가져오는 함수 */
    if (user.is_logined) {
      const getUserData = async () => {
        try {
          await fetchUserData(user.email);
        } catch (error) {
          console.error("유저의 데이터를 찾을 수 없습니다.", error);
        }
      };
      getUserData();
    }
  }, [user]);

  /** 개인정보 수정 페이지로 이동 */
  const onClickHandleProfileEdit = () => {
    if (!user.is_logined) { // 로그아웃 상태일때 개인정보 수정 클릭 시 로그인 페이지로 이동
      navigate('/login');
      return;
    }
    navigate(`/profile/edit/${user.email}`);
  };

  /** 등록숙소 예약관리 페이지로 이동 */
  const onClickHandleMyaccreserve = () => {
    navigate(`/myaccreserve`);
  };

  /** 이용방법 페이지로 이동 */
  const onClickHandleAbout = () => {
    navigate(`/About`);
  };

   /** Q&A 클릭 시 챗봇 페이지로 이동 */
  const onClickHandleChatBot = () => {
    navigate('/chatbot');
  };

  /** 회원 탈퇴 버튼 클릭 시 모달 열기 */
  const onClickHandleProfileDelete = () => {
    if (!user.is_logined) { // 로그아웃 상태일때 회원 탈퇴 클릭 시 로그인 페이지로 이동
      navigate('/login');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  /** 회원 탈퇴 취소 */
  const onClickHandleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  /** 회원 탈퇴 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      // 토큰 먼저 비워주고 삭제해야 함
      await logoutUser();
      // 여행, 등록숙소 페이지에서 새로고침 시 로그인 상태 확인용 localstorage data 추가
      // : front 에서 강제로 localstorage 를 수정하더라도 그 때는 전역 상태 loginstate 에 저장된 값에 따라 
      // 데이터를 출력하기 때문에 빈 값이 나오도록 함.
      localStorage.setItem('is_logined', "false");
      await deleteUser(user.email); 
      window.location.href = '/';
    } catch (error) {
      console.error("회원 탈퇴에 실패했습니다.", error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  /** 로그아웃 버튼 클릭 시 홈으로 이동 */
  const onClickHandleProfileLogout = () => {
    logoutUser()
      .then(res => {
        if (res?.data && res.data.code === 200) {
          localStorage.setItem('is_logined', "false");
          window.location.href = '/';
        } else {
          alert("로그아웃 오류가 발생하였습니다.");
        }
      });
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileEmoji>{user.photo || "👤"}</ProfileEmoji>
        {user.is_logined ? (
          <ProfileName>{user.nickname} ({user.name})</ProfileName>
        ) : (
          <ProfileName>여행을 계획하려면 로그인하세요!</ProfileName>
        )}
      </ProfileHeader>
      <ProfileSection onClick={onClickHandleProfileEdit}>
        <ProfileLabel>개인정보 수정</ProfileLabel>
        <ProfileEdit>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </ProfileEdit>
      </ProfileSection>
      <ProfileSection onClick={onClickHandleMyaccreserve}>
        <ProfileLabel>등록숙소 예약관리</ProfileLabel>
        <ProfileEdit>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </ProfileEdit>
      </ProfileSection>
      <ProfileSection onClick={onClickHandleAbout}>
        <ProfileLabel>Stay and Go 이용방법</ProfileLabel>
        <ProfileEdit>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </ProfileEdit>
      </ProfileSection>
      <ProfileSection onClick={onClickHandleChatBot}>
        <ProfileLabel>Q&A</ProfileLabel>
        <ProfileEdit>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </ProfileEdit>
      </ProfileSection>
      <ProfileSection>
        <ProfileDelete onClick={onClickHandleProfileDelete}>회원 탈퇴</ProfileDelete>
      </ProfileSection>
      {user.is_logined ? (
        <ProfileLogout onClick={onClickHandleProfileLogout}>로그아웃</ProfileLogout>
      ) : (
        <ProfileLogout onClick={() => navigate('/login')}>로그인</ProfileLogout>
      )}

      {isDeleteModalOpen && (
        <ProfileModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={onClickHandleConfirmDelete}
          onCancel={onClickHandleCancelDelete}
          isDelete={true}
        />
      )}
    </ProfileContainer>
  );
};

export default Profile;
