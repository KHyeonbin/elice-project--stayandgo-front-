import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { TokenAttom } from "../../atoms/TokenAtom";

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

const LoginBtn = styled.button`
  background: #f87878;
  color: #fff;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 15px;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useSetRecoilState(TokenAttom);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("/login", { email, password });
    // 엑세스 토큰 Recoil 전역 상태에 저장
    setAccessToken(response.data.accessToken);
    navigate("/");
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <LoginInput
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <LoginInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <LinkUl>
        <LinkLi>
          <Link to="/findId">아이디 찾기</Link>
        </LinkLi>
        |
        <LinkLi>
          <Link to="/findPassword">비밀번호 찾기</Link>
        </LinkLi>
      </LinkUl>
      <LoginBtn type="submit">로그인</LoginBtn>

      <JoinBox>
        아직 회원이 아니세요?
        <Link to="/join">회원가입</Link>
      </JoinBox>
    </form>
  );
};

export default Login;
