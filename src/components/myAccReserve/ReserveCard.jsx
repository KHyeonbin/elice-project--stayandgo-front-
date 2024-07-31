//나의숙소 예약관리에 나오는 예약카드
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyAccModal from "./MyAccModal";
import ImageSlider from "../layout/ImageSlider";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  width: 300px;
  height: 111px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
`;
const Title = styled.span`
  margin-top: 16px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19.36px;
`;
const Name = styled.span`
  margin-top: 16px;
  font-size: 14px;
  line-height: 16.94px;
`;
const DateContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
`;
const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
  border-right: 2px solid #dddddd;
`;
const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
`;
const DescriptionBold = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
`;
const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 14.52px;
`;

const ReserveCard = ({
  title,
  main_image,
  sub_images = [],
  author,
  startDate,
  endDate,
  adult,
  child,
  baby,
  amount,
  create_at,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 열렸는지? 기본값 false
  const [imageUrls, setImageUrls] = useState([]); //이미지 url을 배열상태로 저장
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //현재이미지의 index값 첫번째는 0
  const [modalImageIndex, setModalImageIndex] = useState(0); //모달창에서도 동일

  //이미지가 변경될때마다 상태 업데이트 및 배열에 넣어줌
  useEffect(() => {
    setImageUrls([main_image, ...sub_images]);
  }, [main_image, sub_images]);

  const handleClick = () => {
    //모달창 열기 및 첫번째 이미지 보여주기
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    //모달창 닫기
    setIsModalOpen(false);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <ImageSlider
          imageUrls={imageUrls}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />
        <DetailContainer>
          <Title>{title}</Title>
          <Name>예약자: {author}님</Name>
          <DateContainer>
            <StartDate>
              <DescriptionBold>체크인</DescriptionBold>
              <Description>{startDate}</Description>
            </StartDate>
            <EndDate>
              <DescriptionBold>체크아웃</DescriptionBold>
              <Description>{endDate}</Description>
            </EndDate>
          </DateContainer>
        </DetailContainer>
      </Container>
      {isModalOpen && (
        <MyAccModal
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          closeModal={closeModal}
          author={author}
          imageUrls={imageUrls}
          title={title}
          startDate={startDate}
          endDate={endDate}
          adult={adult}
          child={child}
          baby={baby}
          amount={amount}
          create_at={create_at}
        />
      )}
    </>
  );
};

export default ReserveCard;
