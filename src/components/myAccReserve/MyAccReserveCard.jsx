//나의숙소 예약관리에 나오는 예약카드
import React, { useState, useEffect } from "react";
import MyAccModal from "./MyAccModal";
import ImageSlider from "../layout/ImageSlider";
import * as Card from "./MyAccReserveCard.style";

const MyAccReserveCard = ({
  id,
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
  onCheckboxChange,
  isChecked,
  showCheckbox
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 열렸는지? 기본값 false
  const [imageUrls, setImageUrls] = useState([]); //이미지 url을 배열상태로 저장
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //현재이미지의 index값 첫번째는 0
  const [modalImageIndex, setModalImageIndex] = useState(0); //모달창에서도 동일

  //이미지가 변경될때마다 상태 업데이트 및 배열에 넣어줌
  useEffect(() => {
    setImageUrls([main_image, ...sub_images]);
  }, [main_image, sub_images]);

  //모달창 열기 및 첫번째 이미지 보여주기
  const handleClick = () => {
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onCheckboxChange(id);
  };

  return (
    <>
      <Card.Container onClick={handleClick}>
        <ImageSlider
          imageUrls={imageUrls}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />
        <Card.DetailContainer>
          <Card.Title>{title}</Card.Title>
          <Card.Name>예약자: {author}님</Card.Name>
          <Card.DateContainer>
            <Card.StartDate>
              <Card.DescriptionBold>체크인</Card.DescriptionBold>
              <Card.Description>{startDate}</Card.Description>
            </Card.StartDate>
            <Card.EndDate>
              <Card.DescriptionBold>체크아웃</Card.DescriptionBold>
              <Card.Description>{endDate}</Card.Description>
            </Card.EndDate>
          </Card.DateContainer>
        </Card.DetailContainer>
        {showCheckbox && (
          <Card.CheckContainer>
            <Card.CheckboxOption onClick={handleCheckboxClick} checked={isChecked} />
          </Card.CheckContainer>
        )}
      </Card.Container>
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

export default MyAccReserveCard;
