import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
`;

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

const RequestBtn = styled.button`
  color: #f87878;
  background: #fff;
  height: 50px;
  width: 120px;
  border: 1px solid #f87878;
  border-radius: 15px;
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

const Findpassword = () => {
  const [email, setEmail] = useState();
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const response = await axios.get(`/user?email=${email}`);
    // response.data로 데이터 받아와 사용자 이메일로 비밀번호 전달...?
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <FlexDiv>
        <LoginInput
          type="email"
          placeholder="이메일"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <RequestBtn>인증요청</RequestBtn>
      </FlexDiv>
      <LinkUl>
        <LinkLi>
          <Link to="/findId">아이디 찾기</Link>
        </LinkLi>
        |
        <LinkLi>
          <Link to="/login">로그인 하기</Link>
        </LinkLi>
      </LinkUl>
      <ShowBtn type="submit">인증확인</ShowBtn>
    </form>
  );
};

export default Findpassword;
