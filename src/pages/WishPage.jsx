import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import loginState from "../atoms/loginState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import WishCard from "../components/main/WishCard";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 15px;
`;

const WishlistContainer = styled.div`
  display: grid;
  grid-template-columns: 163px 163px;
  grid-column-gap: 17px;
`;

const WishPage = () => {
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });
    // false
    /*
        setLoginUser({
            email: "",
            nickName: "건우",
            is_admin: false,
            is_logined: false
        });
        */
  }, []);

  return (
    <>
      <Header user={loginUser} />
      <Title>위시 리스트</Title>
      <WishlistContainer>
        <WishCard />
        <WishCard title="부산의 집" />
        <WishCard title="강릉의 집" />
        <WishCard title="제주의 집" />
        <WishCard title="대전의 집" />
      </WishlistContainer>
    </>
  );
};

export default WishPage;
