import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
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
} from "../components/profile/ProfilePageStyle";

const ProfilePage = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate(); // 페이지 이동하기 위해 사용

  useEffect(() => {
    const dummyData = { name: "엘리스", email: "elice@test.com" };
    setUser(dummyData);
  }, []);

  const onClickHandleProfileEdit = () => {
    console.log("개인정보수정 페이지");
    navigate("/profile/edit");
  };

  const onClickHandleProfileDelete = () => {
    console.log("회원 탈퇴");
  };

  const onClickHandleProfileLogout = () => {
    console.log("로그아웃");
    navigate("/");
  };

  return (
    <SubLayout pageTitle="프로필">
      <ProfileContainer>
        <ProfileHeader>
          <ProfileImage />
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
      </ProfileContainer>
      <MainFooter />
    </SubLayout>
  );
};
export default ProfilePage;
