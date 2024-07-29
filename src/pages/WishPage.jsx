import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Header from "../components/layout/SubHeader";
import loginState from "../atoms/loginState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Footer from "../components/layout/MainFooter";
import WishCard from "../components/wishlist/WishCard";

const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 15px;
`;

const WishlistContainer = styled.div`
  display: grid;
  grid-template-columns: 163px 163px;
  grid-column-gap: 17px;
  padding-bottom: 60px;
`;

const WishPage = () => {
  const loginUser = useRecoilValue(loginState);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    
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
      <Footer user={loginUser} />
    </>
  );
};

export default WishPage;
