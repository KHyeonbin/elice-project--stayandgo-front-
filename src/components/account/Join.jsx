import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendEmailCertification,
  certificationCode,
} from "../../api/EmailRequest";

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const RequestBtn = styled.button`
  color: #f87878;
  background: #fff;
  height: 50px;
  width: 120px;
  border: 1px solid #f87878;
  border-radius: 15px;
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
const JoinBtn = styled.button`
  background: #f87878;
  color: #fff;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 15px;
  margin-top: 15px;
`;

const Join = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    code: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setUserInfo((userInfoObj) => {
      const inputName = e.target.name;
      let inputValue = e.target.value;
      if (inputName === "phoneNumber") {
        inputValue = inputValue.replace(/\D/g, ""); // 문자 입력 제거
        inputValue = inputValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형태로 리턴
      }
      return { ...userInfoObj, [inputName]: inputValue };
    });
  };

  //회원가입 완료 버튼 클릭 시
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    certificationCode(userInfo.email, userInfo.code);

    const response = await axios.post("/login", {
      email: userInfo.email,
      password: userInfo.password,
      name: userInfo.name,
      phoneNumber: userInfo.phoneNumber,
    });
    navigate("/joinEnd");
  };

  // 이메일 인증 버튼 클릭 시
  const onEmailRequestHandler = async (e) => {
    e.preventDefault();
    sendEmailCertification(userInfo.email);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FlexDiv>
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
        <RequestBtn type="button" onClick={onEmailRequestHandler}>
          인증요청
        </RequestBtn>
      </FlexDiv>

      <JoinInput
        type="text"
        placeholder="인증번호"
        name="code"
        value={userInfo.code}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />

      <JoinInput
        type="text"
        placeholder="이름"
        name="name"
        value={userInfo.name}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />

      <JoinInput
        type="password"
        placeholder="비밀번호"
        name="password"
        value={userInfo.password}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />
      <JoinInput
        type="text"
        placeholder="휴대폰번호"
        name="phoneNumber"
        maxLength={13}
        value={userInfo.phoneNumber}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />
      <JoinBtn type="submit">가입하기</JoinBtn>
    </form>
  );
};

export default Join;
