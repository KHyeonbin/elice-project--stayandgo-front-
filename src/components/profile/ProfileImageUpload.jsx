import React, { useRef } from "react";
import { ProfileEditImageContainer, ProfileEditImagePlaceholder, ProfileImage } from "./ProfileEditPageStyle";

/** 개인정보 수정 프로필 이미지 업로드 */
const ProfileImageUpload = ({ profileImage, setProfileImage }) => {
  const fileInputRef = useRef(null);

  // 이미지 변경될 때 호출되는 함수
  const onChangeHandleImage = (e) => {
    const file = e.target.files[0]; // 선택한 파일 가져오기
    if (file) {
      const fileReader = new FileReader(); // FileReader: 데이터를 비동기적으로 읽는데 도움을 주는 웹 api, 객체 형태
      fileReader.onloadend = () => {
        // onloadend: 성공여부와 상관없이 호출되는 이벤트 핸들러
        setProfileImage(fileReader.result); // 파일 읽기가 완료되면 profileImage 상태 업데이트
      };
      fileReader.readAsDataURL(file); // 파일을 Data URL로 읽음
    }
  };

  // 프로필 이미지 클릭 시 임력 요소 트리거하는 함수
  const onClickHandleImageUpload = () => {
    fileInputRef.current.click(); // 파일 입력 요소를 클릭하여 파일 선택 창을 열기
  };

  return (
    <ProfileEditImageContainer>
      <ProfileEditImagePlaceholder onClick={onClickHandleImageUpload}>
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="50" height="50">
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onChangeHandleImage}
          ref={fileInputRef}
        />
      </ProfileEditImagePlaceholder>
    </ProfileEditImageContainer>
  );
};

export default ProfileImageUpload;
