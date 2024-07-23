import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Image = styled.div`
  background-color: #d9d9d9;
  border-radius: 15px;
  width: 111px;
  height: 111px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
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
`;

const PrevButton = styled(ArrowButton)`
  left: 5px;
`;

const NextButton = styled(ArrowButton)`
  right: 5px;
`;

const ImageSlider = ({ imageUrls, currentIndex, setCurrentIndex }) => {
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
    <Image imageUrl={imageUrls[currentIndex]}>
      {imageUrls.length > 1 && (
        <>
          <PrevButton onClick={handlePrevClick}>&lt;</PrevButton>
          <NextButton onClick={handleNextClick}>&gt;</NextButton>
        </>
      )}
    </Image>
  );
};

export default ImageSlider;
