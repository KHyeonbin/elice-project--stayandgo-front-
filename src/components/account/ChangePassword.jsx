import axios from "axios";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { PasswordRegex } from "../account/Regex";
import { changePWUser } from "../../api/changePWUser";

const LoginInput = styled.input`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 15px;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  ::placeholder {
    color: #666;
  }
  & + input {
    margin-top: 10px;
  }
`;


const MessageDiv = styled.div`
  font-size: 12px;
  color: red;
  padding: 5px 0;
`;

const SubmitBtn = styled.button`
  background: #f87878;
  color: #fff;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 15px;
  margin-top: 15px;

  cursor: pointer;
`;

const ChangePassword = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [errors, setErrors] = useState({
    passwordCheckError: "",
    passwordError: "",
    passwordError2: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 10) {
      return "10자 이상 입력해주세요.";
    }

    const [hasLetter, hasNumber, hasSpecialChar] = PasswordRegex(password);
    const isValidCombination =
      [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

    if (!isValidCombination) {
      return "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합";
    }

    return "";
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { passwordCheckError, passwordError, passwordError2 } = errors;
    // 비밀번호 유효성 검사
    if (passwordCheckError || passwordError || passwordError2) {
      alert("비밀번호를 확인해주세요.");
      return false;
    }
    if (userInfo.password !== userInfo.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
        changePWUser(location.state.email, userInfo.password)
        .then(res => {
          if(res.data.code === 200){
            alert("비밀번호가 변경되었습니다.");
            navigate("/login");
          } else {
            alert(res.data.message ? res.data.message : "알 수 없는 오류가 발생")
          }
        })
    } catch (error) {
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 인풋 입력 시 상태 변경
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));

    if (name === "password") {
      const error = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: error,
        passwordError2: error ? prevErrors.passwordError2 : "",
      }));
    }

    if (name === "passwordCheck") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordCheckError: userInfo.password !== value ? "비밀번호가 일치하지 않습니다." : "",
      }));
    }
  };

  const { passwordError, passwordError2, passwordCheckError } = errors;

  return (
    <form onSubmit={onSubmitHandler}>
      <LoginInput
        type="email"
        placeholder="이메일"
        name="email"
        value={location.state.email ? location.state.email : ""}
        readOnly
        required
      />
      <LoginInput
        type="password"
        placeholder="비밀번호"
        name="password"
        value={userInfo.password}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      {passwordError && <MessageDiv>{passwordError}</MessageDiv>}
      {passwordError2 && <MessageDiv>{passwordError2}</MessageDiv>}

      <LoginInput
        type="password"
        placeholder="비밀번호 확인"
        name="passwordCheck"
        value={userInfo.passwordCheck}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />
      {passwordCheckError && <MessageDiv>{passwordCheckError}</MessageDiv>}

      <SubmitBtn type="submit">변경하기</SubmitBtn>
    </form>
  );
};

export default ChangePassword;
