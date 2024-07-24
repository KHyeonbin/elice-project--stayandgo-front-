import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const LinkUl = styled.ul`
  text-align: center;
  padding: 15px 0;
`;

const LinkLi = styled.li`
  display: inline-block;
  font-size: 12px;
  color: 666;
  margin: 0 5px;
`;

const ShowBtn = styled.button`
  background: #f87878;
  color: #fff;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 15px;
`;

const UserInfoDiv = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const JoinBox = styled.div`
  text-align: center;
  padding-top: 20px;
  & a {
    font-weight: bold;
    margin-left: 5px;
    text-decoration: underline;
  }
`;

const Findpassword = () => {
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [userId, setUserId] = useState(null);
  const onSubmitHandle = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `/user?name=${name}&phoneNumber=${phoneNumber}`
    );
    setUserId(response.data.email);
  };

  const phoneNumberChangeHandler = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, ""); // 문자 입력 제거
    inputValue = inputValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형태로 리턴
    setPhoneNumber(inputValue);
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <LoginInput
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <LoginInput
        type="text"
        placeholder="핸드폰번호"
        // 정규표현식 사용으로 value값에 undefined가 들어가는 경우가 있어 undefined일 경우 빈 문자열을 값으로 가진다.
        value={phoneNumber || ""}
        maxLength={13}
        onChange={(e) => {
          phoneNumberChangeHandler(e);
        }}
        required
      />
      <LinkUl>
        <LinkLi>
          <Link to="/findPassword">비밀번호 찾기</Link>
        </LinkLi>
        |
        <LinkLi>
          <Link to="/login">로그인 하기</Link>
        </LinkLi>
      </LinkUl>
      <ShowBtn type="button">확인</ShowBtn>
      <JoinBox>
        아직 회원이 아니세요?
        <Link to="/join">회원가입</Link>
      </JoinBox>

      {userId && (
        <UserInfoDiv>
          아이디는 <b>${userId}</b>입니다.
        </UserInfoDiv>
      )}
    </form>
  );
};

export default Findpassword;
