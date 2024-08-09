import axios from "axios";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordRegex, PhoneNumberRegex } from "../account/Regex";
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
  &:disabled {
    color: #bbb;
    border-color: #ddd;
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

const MessageDiv = styled.div`
  font-size: 12px;
  color: red;
  padding: 5px 0;
`;

const Join = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    phone: "",
    code: "",
    nickName: "",
  });
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const navigate = useNavigate();
  const emailCodeInput = useRef();
  const emailRequestBtn = useRef();

  // 인풋 입력 시 상태 변경
  const onChangeHandler = (e) => {
    setUserInfo((userInfoObj) => {
      const inputName = e.target.name;
      let inputValue = e.target.value;

      if (inputName === "phone") {
        // 문자 입력 제거
        // 000-0000-0000 형태로 리턴
        inputValue = PhoneNumberRegex(inputValue);
      }

      if (inputName === "password") {
        if (inputValue.length > 0 && inputValue.length < 10) {
          setPasswordError("10자 이상 입력해주세요.");
        } else {
          setPasswordError("");

          /** 영문, 숫자, 특수문자(공백 제외) 포함 여부 확인 / 정규표현식 사용 */
          const [hasLetter, hasNumber, hasSpecialChar] = PasswordRegex(inputValue);
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

  // password인풋 값 수정 시 passwordCheck 유효성 검사
  useEffect(() => {
    if (userInfo.password !== userInfo.passwordCheck) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckError("");
    }
  }, [userInfo]);

  //회원가입 완료 버튼 클릭 시
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!!passwordCheckError || !!passwordError2 || !!passwordError) {
        alert("비밀번호를 확인해주세요.");
        return false;
      }
      await axios.post("http://localhost:3001/users", {
        email: userInfo.email,
        password: userInfo.password,
        name: userInfo.name,
        nickname: userInfo.nickName,
        phone: userInfo.phone,
      }, {
        withCredentials: true
      });

      navigate("/joinEnd");
    } catch(error) {
      alert(error.response.data.message);
    }

  };

  // 이메일 요청 버튼 클릭 시
  const onEmailRequestHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/users/verify", {
        email: userInfo.email,
      }, {
        withCredentials: true
      });
      e.target.disabled = true;
      emailCodeInput.current.readOnly = false;
      emailRequestBtn.current.disabled = false;
      alert("이메일이 발송되었습니다.");
      // 이메일 인증 요청 시 버튼 비활성화
    } catch(error) {
      e.target.disabled = false;
      alert(error.response.data.message);
    };
  };


  // 이메일 인증 확인 버튼 클릭 시
  const onEmailCheckHandler = async (e) => {
    //e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/verify/confirm",
        {
          email: userInfo.email,
          secret: userInfo.code,
        }
        , {
          withCredentials: true
        });
      // 이메일 인증 요청 시 버튼 비활성화
      e.target.disabled = true;
      emailCodeInput.current.readOnly = true;
      alert(response.data.message);
    } catch(error) {
      //emailRequestBtn.current.disabled = false;
      e.target.disabled = false;
      alert(error.response); // 확인 !!
    }

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
        <RequestBtn
          type="button"
          onClick={onEmailRequestHandler}
          ref={emailRequestBtn}
        >
          인증요청
        </RequestBtn>
      </FlexDiv>
      <FlexDiv>
        <JoinInput
          type="text"
          placeholder="인증번호"
          name="code"
          value={userInfo.code}
          onChange={(e) => {
            onChangeHandler(e);
          }}
          ref={emailCodeInput}
          required
        />
        <RequestBtn type="button" onClick={onEmailCheckHandler}>
          인증확인
        </RequestBtn>
      </FlexDiv>

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

      <JoinInput
        type="text"
        placeholder="휴대폰번호"
        name="phone"
        maxLength={13}
        // 정규표현식 사용으로 value값에 undefined가 들어가는 경우가 있어 undefined일 경우 빈 문자열을 값으로 가진다.
        value={userInfo.phone || ""}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        required
      />
      <JoinInput
        type="text"
        placeholder="닉네임"
        name="nickName"
        value={userInfo.nickName}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      <JoinBtn type="submit">가입하기</JoinBtn>
    </form>
  );
};

export default Join;
