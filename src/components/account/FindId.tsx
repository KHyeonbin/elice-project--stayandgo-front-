import React, {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { findIDUser } from "../../api/findIDUser";
import { CopyToClipboard } from "react-copy-to-clipboard";


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
  cursor: pointer;
`;

const UserInfoDiv = styled.div`
  text-align: center;
  padding: 30px 0;
  border: 2px dashed #ffbebe;
  margin-top: 30px;
  border-radius: 20px;
  background: #fff6f6;
  & button {border: 0; background: 0; font-size: 16px;}
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

const FindId: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    findIDUser(name, phoneNumber)
    .then(res => {
      if(res?.data && res.data.code === 200){
        setUserId(res.data.data);
      } else {
        throw new Error(res?.data.message || "알 수 없는 오류가 발생했습니다.");
      }
    });
  };
  
  const phoneNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
      <ShowBtn type="submit">확인</ShowBtn>
      <JoinBox>
        아직 회원이 아니세요?
        <Link to="/join">회원가입</Link>
      </JoinBox>

      {userId && (
        <CopyToClipboard className="Toram" text={userId} onCopy={() => alert("아이디가 클립보드에 복사되었습니다.")}>
          <UserInfoDiv>
            아이디는 <button type="button"><b>{userId}</b></button>입니다.
          </UserInfoDiv>
        </CopyToClipboard>

      )}
    </form>
  );
};

export default FindId;
