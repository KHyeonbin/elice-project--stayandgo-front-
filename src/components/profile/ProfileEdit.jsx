import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProfileEditContainer,
  ProfileEditSection,
  ProfileEditForm,
  ProfileEditInput,
  ProfileEditButtonContainer,
  ProfileEditSaveButton,
  ErrorMessage,
} from "./ProfileEditPageStyle";
import ProfileImageUpload from "./ProfileImageUpload"; // 프로필 이미지 업로드 기능 컴포넌트
import ProfileModal from "./ProfileModal"; // 수정 완료 모달
import axios from "axios";

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModal, setIsModal] = useState(false);

  const { id } = useParams(); // url 파라미터로 사용자 id값 가져옴

  const navigate = useNavigate();

  /** 사용자 정보 불러오기 */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`users/edit/${id}`); // 임시 엔드포인트
        const userData = response.data;
        setProfileImage(userData.profileImage);
        setEmail(userData.email);
        setName(userData.name);
        setPhone(userData.phone);
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserData();
  }, [id]);

  /** 비밀번호 유효성 검사 함수 */
  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 10) {
      setPasswordError("10자 이상 입력해주세요.");
      return false;
    } else {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
      const isValidCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

      if (!isValidCombination) {
        setPasswordError("영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    }
  };

  /** 인풋 변경 핸들러 */
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = value.replace(/\D/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 휴대폰 번호 형식 변경
      setPhone(formattedValue);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    }
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  useEffect(() => {
    setPasswordCheckError(
      passwordCheck.length > 0 && password !== passwordCheck ? "비밀번호가 일치하지 않습니다." : "",
    );
  }, [passwordCheck, password]);

  /** 완료 버튼 클릭 시 */
  const onClickHandleSave = async (e) => {
    e.preventDefault();

    // 아무 입력하지 않고 완료 버튼 클릭 했을 때
    if (!password || !passwordCheck || !phone) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    if (passwordError || passwordCheckError) {
      return;
    }

    const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      alert("휴대폰 번호는 000-0000-0000 형태로 입력해야 합니다.");
      return;
    }

    /** 서버로 수정된 정보 전송 */
    try {
      await axios.put(`/users/${id}`, {
        // 임시 엔드포인트
        password,
        phone,
        profileImage,
      });
    } catch (error) {
      console.error("사용자 정보를 수정하는데 실패했습니다.");
    }
  };

  /** 모달 닫기 함수 */
  const onClickHandleCloseModal = () => {
    setIsModal(false);
    navigate("/"); // 모달 닫기 클릭 시 홈으로 이동
  };

  return (
    <>
      <ProfileEditContainer>
        <ProfileEditSection>
          <ProfileImageUpload profileImage={profileImage} setProfileImage={setProfileImage} />
          <ProfileEditForm>
            <ProfileEditInput type="email" id="email" name="email" value={email} disabled />
            <ProfileEditInput
              type="password"
              id="password"
              name="password"
              placeholder="새 비밀번호 입력"
              value={password}
              required
              onChange={onChangeHandler}
            />
            {password.length > 0 && password && <ErrorMessage>{passwordError}</ErrorMessage>}
            <ProfileEditInput
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              placeholder="새 비밀번호 확인"
              value={passwordCheck}
              required
              onChange={onChangeHandler}
            />
            {passwordCheck.length > 0 && passwordCheckError && <ErrorMessage>{passwordCheckError}</ErrorMessage>}
            <ProfileEditInput type="text" id="name" name="name" value={name} disabled />
            <ProfileEditInput
              type="tel"
              id="phone"
              name="phone"
              placeholder="휴대폰 번호"
              maxLength={13}
              value={phone}
              required
              onChange={onChangeHandler} // 휴대폰 번호 형식 변경 핸들러 사용
            />
            <ProfileEditButtonContainer>
              <ProfileEditSaveButton onClick={onClickHandleSave}>완료</ProfileEditSaveButton>
            </ProfileEditButtonContainer>
          </ProfileEditForm>
        </ProfileEditSection>
      </ProfileEditContainer>
      {isModal && <ProfileModal message="수정이 완료되었습니다!" onClose={onClickHandleCloseModal} />}
    </>
  );
};

export default ProfileEdit;
