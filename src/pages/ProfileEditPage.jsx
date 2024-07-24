import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ProfileEditSuccessModal from "../components/profile/ProfileEditSuccessModal";

const ProfileEditPage = () => {
  const [profileImg, setProfileImg] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  // 완료 버튼 클릭 시
  const onClickHandleSave = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!password || !phone) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 수정 완료 일때 모달 열기
    setIsModal(true);
  };

  const onClickHandleCloseModal = () => {
    setIsModal(false);
    navigate("/"); // 모달 닫기 클릭 시 홈으로 이동
  };

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
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <ProfileEditInput type="text" id="name" name="name" value="엘리스" disabled />
              <ProfileEditInput
                type="tel"
                id="phone"
                name="phone"
                placeholder="전화번호를 입력하세요."
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <ProfileEditButtonContainer>
                <ProfileEditSaveButton onClick={onClickHandleSave}>완료</ProfileEditSaveButton>
              </ProfileEditButtonContainer>
            </ProfileEditForm>
          </ProfileEditSection>
        </ProfileEditContainer>
        {isModal && <ProfileEditSuccessModal message="수정이 완료되었습니다!" onClose={onClickHandleCloseModal} />}
      </SubLayout>
      <MainFooter />
    </>
  );
};

export default ProfileEditPage;
