import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import favoriteImg from "../../assets/icons/favorite.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  width: 163px;
  height: 253px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Image = styled.div`
  background-color: #f1f1f1;
  border-radius: 15px;
  width: 163px;
  height: 163px;
  position: relative;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
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
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // 서버에서 이미지 URL을 받아오는 예시
    const fetchImage = async () => {
      try {
        const response = await fetch("https://api.example.com/image-url"); // 이미지 URL을 가져오는 API 호출
        const data = await response.json();
        setImageUrl(data.imageUrl); // 받아온 이미지 URL을 상태에 저장
      } catch (error) {
        console.error("이미지 가져오기 실패:", error);
        // 실패 시 기본 이미지 설정
        setImageUrl("https://via.placeholder.com/173");
      }
    };

    fetchImage();
  }, []);

  const handleClick = () => {
    navigate(`/detail/${title}`);
  };

  return (
    <Container onClick={handleClick}>
      <Image imageUrl={imageUrl}>
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
