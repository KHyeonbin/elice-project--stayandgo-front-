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
    setUserId(response.data.id);
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
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
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
      {userId && <UserInfoDiv>아이디 : ${userId}</UserInfoDiv>}
    </form>
  );
};

export default Findpassword;
