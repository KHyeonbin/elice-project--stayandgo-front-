import React from "react";
import { useState } from "react";
import styled from "styled-components";
import favoriteImg from "../../assets/icons/favorite.png";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  width: 173px;
  height: 253px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  background-color: #f1f1f1;
  border-radius: 15px;
  width: 173px;
  height: 173px;
  position: relative;
`;

const FavoriteImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const DetailContainer = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  margin-top: 10px;
  font-weight: bold;
  color: #333333;
  font-size: 12px;
  line-height: 14.52px;
`;
const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 14.52px;
`;
const Price = styled.span`
  font-weight: bold;
  margin-top: 7px;
  font-size: 12px;
  line-height: 14.52px;
`;

const WishCard = ({ title, description, price }) => {
  return (
    <Container>
      <Image>
        <FavoriteImg src={favoriteImg} />
      </Image>
      <DetailContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Price>{price.toLocaleString()}원 / 1박</Price>
      </DetailContainer>
    </Container>
  );
};

WishCard.defaultProps = {
  title: "전주의 집",
  description: "[옥탑방의 하루] 투룸 전주 시내 도보 관광",
  price: 120000,
};

export default WishCard;
