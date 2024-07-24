// ImageSlider.js
import React from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  overflow: hidden;
  border-radius: 15px;

  &:hover .arrow-button {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .arrow-button {
      opacity: 1;
      display: block;
    }
  }
`;

const SliderImage = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50px;
  padding: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const PrevButton = styled(ArrowButton)`
  left: 5px;
  ${(props) => !props.show && "display: none;"}
`;

const NextButton = styled(ArrowButton)`
  right: 5px;
  ${(props) => !props.show && "display: none;"}
`;

const ImageSlider = ({
  imageUrls,
  currentIndex,
  setCurrentIndex,
  size = 111,
}) => {
  const handlePrevClick = (event) => {
    event.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const handleNextClick = (event) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <SliderContainer size={size}>
      <SliderImage imageUrl={imageUrls[currentIndex]} />
      {imageUrls.length > 1 && (
        <>
          <PrevButton
            className="arrow-button"
            show={currentIndex > 0 || window.innerWidth <= 768}
            onClick={handlePrevClick}
          >
            &lt;
          </PrevButton>
          <NextButton
            className="arrow-button"
            show={
              currentIndex < imageUrls.length - 1 || window.innerWidth <= 768
            }
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
