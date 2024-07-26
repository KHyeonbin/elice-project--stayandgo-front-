import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const JoinInput = styled.input`
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
`;

const ChangePassword = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // 비밀번호 유효성 검사
    if (!!passwordCheckError || !!passwordError2 || !!passwordError) {
      alert("비밀번호를 확인해주세요.");
      return false;
    }

    // 비밀번호 변경 요청 API
    const response = await axios.push("/", {
      email: userInfo.email,
      password: userInfo.password,
    });

    if (response) {
      alert("비밀번호가 변경되었습니다.");
      navigate("/login");
    }
  };

  // 인풋 입력 시 상태 변경
  const onChangeHandler = (e) => {
    setUserInfo((userInfoObj) => {
      const inputName = e.target.name;
      let inputValue = e.target.value;

      if (inputName === "password") {
        if (inputValue.length > 0 && inputValue.length < 10) {
          setPasswordError("10자 이상 입력해주세요.");
        } else {
          setPasswordError("");

          /** 영문, 숫자, 특수문자(공백 제외) 포함 여부 확인 / 정규표현식 사용 */
          const hasLetter = /[a-zA-Z]/.test(inputValue); // 영문자 포함 여부
          const hasNumber = /[0-9]/.test(inputValue); // 숫자 포함 여부
          const hasSpecialChar = /[^a-zA-Z0-9]/.test(inputValue); // 특수 문자 포함 여부
          const isValidCombination =
            [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;
          // filter() 이용해서 각각 2개 이상 조합 참, 거짓인지 확인

          if (!isValidCombination) {
            setPasswordError2(
              "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
            );
          } else {
            setPasswordError2("");
          }
        }
      }

      if (inputName === "passwordCheck") {
        if (userInfo.password !== inputValue) {
          setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        } else {
          setPasswordCheckError("");
        }
      }

      return { ...userInfoObj, [inputName]: inputValue };
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <JoinInput
        type="email"
        placeholder="이메일"
        name="email"
        value={userInfo.email}
        onChange={(e) => {
          onChangeHandler(e);
        }}
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

      <JoinInput
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
