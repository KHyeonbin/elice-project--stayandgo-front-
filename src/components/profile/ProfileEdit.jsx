import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProfileEditContainer,
  ProfileEditSection,
  ProfileEditForm,
  ProfileEditButtonContainer,
  ProfileEditSaveButton,
  ProfileEditEmojiPlaceholder,
  ProfileEmoji,
} from "./ProfileEditPageStyle";
import ProfileModal from "./ProfileModal"; // 수정 완료 모달
import ProfileInput from "./ProfileInput"; // 분리한 input 컴포넌트 가져오기
import { fetchUserData, editUserData } from "../../api/profile"; // 분리한 api 함수 가져오기
import loginState from "../../atoms/loginState";
import { useRecoilValue } from "recoil";
import { PasswordRegex, PhoneNumberRegex } from "../account/Regex";
import EmojiModal from "./EmojiModal"; // 프로필 이모지 모달

/** 비밀번호 유효성 검사 함수 */
const validatePassword = (password) => {
  if (password.length > 0 && password.length < 10) {
    return "10자 이상 입력해주세요.";
  } else {
    const [hasLetter, hasNumber, hasSpecialChar] = PasswordRegex(password);
    const isValidCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

    if (!isValidCombination) {
      return "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합";
    } else {
      return "";
    }
  }
};

/** 휴대폰 번호 형태 정의 */
const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;

const ProfileEdit = () => {
  const loginUser = useRecoilValue(loginState);
  console.log(loginUser);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    nickname: "",
    phone: "",
    profileEmoji: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isEmojiModal, setIsEmojiModal] = useState(false);

  const { id } = useParams(); // url 파라미터로 사용자 id값 가져옴
  const navigate = useNavigate();

  /** 초기 사용자 정보 설정 */
  useEffect(() => {
    setFormData({
      email: loginUser.email || "",
      password: "",
      passwordCheck: "",
      name: loginUser.name || "",
      nickname: loginUser.nickname || "",
      phone: loginUser.phone || "",
      profileEmoji: loginUser.profileEmoji || "",
    });
  }, [loginUser]);

  /** 사용자 정보 불러오기 */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData(id);
        setFormData((prev) => ({
          ...prev,
          email: userData.email,
          name: userData.name,
          nickname: userData.nickname,
          phone: userData.phone,
          profileEmoji: userData.profileEmoji,
        }));
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    getUserData();
  }, [id]);

  /** 인풋 변경 핸들러 */
  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = PhoneNumberRegex(value);
      setFormData((prev) => ({ ...prev, phone: formattedValue.slice(0, 13) }));
    } else if (name === "password") {
      setFormData((prev) => ({ ...prev, password: value }));
      setPasswordError(validatePassword(value)); // 패스워드 에러 검증
    } else if (name === "passwordCheck") {
      setFormData((prev) => ({ ...prev, passwordCheck: value }));
      setPasswordCheckError(value !== formData.password ? "비밀번호가 일치하지 않습니다." : ""); // 패스워드 확인 에러 검증
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, [formData.password]);

  /** 완료 버튼 클릭 시 */
  const onClickHandleSave = async (e) => {
    e.preventDefault();

    const { password, passwordCheck, phone } = formData;

    // 아무 입력하지 않고 완료 버튼 클릭 했을 때
    if (!password || !passwordCheck || !phone) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    if (passwordError || passwordCheckError) {
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("휴대폰 번호는 000-0000-0000 형태로 입력해야 합니다.");
      return;
    }

    /** 서버로 수정된 정보 전송 */
    try {
      await editUserData(id, formData);
      setIsModal(true);
      navigate("/");
    } catch (error) {
      console.error("사용자 정보를 수정하는데 실패했습니다.");
    }
  };

  /** 모달 닫기 함수 */
  const onClickHandleCloseModal = () => {
    setIsModal(false);
    navigate("/"); // 모달 닫기 클릭 시 홈으로 이동
  };

  /** 이모지 모달 열기 함수 */
  const onClickHandleOpenModal = () => {
    setIsEmojiModal(true);
  }

  /** 이모지 선택 */
  const onSelectHandleEmoji = (emoji) => {
    setFormData((prev) => ({ ...prev, profileEmoji: emoji }));
    setIsEmojiModal(false);
  }

  /** 이모지 모달 닫기 함수 */
  const onClickHandleCloseEmojiModal = () => {
    setIsEmojiModal(false);
  }

  return (
    <>
      <ProfileEditContainer>
        <ProfileEditSection>
          <ProfileEditEmojiPlaceholder onClick={onClickHandleOpenModal}>
            {formData.profileEmoji ? (
              <ProfileEmoji>{formData.profileEmoji}</ProfileEmoji>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="50" height="50">
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            )}
          </ProfileEditEmojiPlaceholder>
          <ProfileEditForm>
            <ProfileInput type="email" name="email" value={formData.email} disabled />
            <ProfileInput
              type="password"
              name="password"
              placeholder="새 비밀번호 입력"
              value={formData.password}
              required
              onChange={onChangeHandler}
              error={passwordError}
            />
            <ProfileInput
              type="password"
              name="passwordCheck"
              placeholder="새 비밀번호 확인"
              value={formData.passwordCheck}
              required
              onChange={onChangeHandler}
              error={passwordCheckError}
            />
            <ProfileInput type="text" name="name" value={formData.name} disabled />
            <ProfileInput
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              required
              onChange={onChangeHandler}
            />
            <ProfileInput
              type="tel"
              name="phone"
              placeholder="휴대폰 번호"
              maxLength={13}
              value={formData.phone}
              required
              onChange={onChangeHandler} 
            />
            <ProfileEditButtonContainer>
              <ProfileEditSaveButton onClick={onClickHandleSave}>완료</ProfileEditSaveButton>
            </ProfileEditButtonContainer>
          </ProfileEditForm>
        </ProfileEditSection>
      </ProfileEditContainer>
      {isModal && <ProfileModal message="수정이 완료되었습니다!" onClose={onClickHandleCloseModal} />}
      {isEmojiModal && <EmojiModal onSelect={onSelectHandleEmoji} onClose={onClickHandleCloseEmojiModal} /> }
    </>
  );
};

export default ProfileEdit;
