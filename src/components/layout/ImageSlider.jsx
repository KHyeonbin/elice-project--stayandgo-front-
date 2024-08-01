import React from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;
//이미지 슬라이드 기능(옆 사진과 이어지게)
const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: ${(props) =>
    props.size * props.imageCount}px; // 너비 = 모든 이미지의 너비를 합산
  height: 100%;
`;
const SliderImage = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: ${(props) => props.size}px;
  height: 100%;
`;
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 50px;
  padding: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5;

  &:hover {
    opacity: 1; // 마우스 오버 시 투명도 1
  }
`;
const PrevButton = styled(ArrowButton)`
  left: 5px;
  ${(props) => !props.show && "display: none;"}//하단 show 조건이 아니면 숨기기
`;
const NextButton = styled(ArrowButton)`
  right: 5px;
  ${(props) => !props.show && "display: none;"}//하단 show 조건이 아니면 숨기기
`;

const ImageSlider = ({
  imageUrls,
  currentIndex,
  setCurrentIndex,
  size = 111,
}) => {
  //이전 버튼 클릭시 이전 이미지로
  const handlePrevClick = (event) => {
    event.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  //다음 버튼 클릭시 다음 페이지로
  const handleNextClick = (event) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <SliderContainer size={size}>
      <SliderWrapper
        size={size}
        imageCount={imageUrls.length}
        style={{ transform: `translateX(-${currentIndex * size}px)` }}
      >
        {imageUrls.map((imageUrl, index) => (
          <SliderImage key={index} imageUrl={imageUrl} size={size} />
        ))}
      </SliderWrapper>
      {imageUrls.length > 1 && (
        <>
          <PrevButton
            className="arrow-button"
            //현재 이미지가 첫번째일때 show 상태
            show={currentIndex > 0}
            onClick={handlePrevClick}
          >
            &lt;
          </PrevButton>
          <NextButton
            className="arrow-button"
            //현재 이미지가 마지막이 아닐때 show 상태
            show={currentIndex < imageUrls.length - 1}
            onClick={handleNextClick}
          >
            &gt;
          </NextButton>
        </>
      )}
    </SliderContainer>
  );
};

export default ImageSlider;
