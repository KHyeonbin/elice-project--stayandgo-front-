import React, { useRef, useState } from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import {
  ProfileEditContainer,
  ProfileEditSection,
  ProfileEditForm,
  ProfileEditInput,
  ProfileEditButtonContainer,
  ProfileEditSaveButton,
} from "../components/profile/ProfileEditPageStyle";
import ProfileImageUpload from "../components/profile/ProfileImageUpload"; // 프로필 이미지 업로드 기능 컴포넌트

const ProfileEditPage = () => {
  const [profileImg, setProfileImg] = useState("");
  return (
    <>
      <SubLayout pageTitle="개인정보 수정">
        <ProfileEditContainer>
          <ProfileEditSection>
            <ProfileImageUpload profileImg={profileImg} setProfileImg={setProfileImg} />
            <ProfileEditForm>
              <ProfileEditInput type="email" id="email" name="email" value="elice@test.com" disabled />
              <ProfileEditInput
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요."
                required
              />
              <ProfileEditInput type="text" id="name" name="name" value="엘리스" disabled />
              <ProfileEditInput type="tel" id="phone" name="phone" placeholder="전화번호를 입력하세요." required />
              <ProfileEditButtonContainer>
                <ProfileEditSaveButton>완료</ProfileEditSaveButton>
              </ProfileEditButtonContainer>
            </ProfileEditForm>
          </ProfileEditSection>
        </ProfileEditContainer>
        <MainFooter />
      </SubLayout>
    </>
  );
};

export default ProfileEditPage;
