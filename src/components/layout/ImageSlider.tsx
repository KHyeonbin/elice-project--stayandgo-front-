import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

// Swiper 관련 스타일
const SwiperContainer = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 0;
`;

interface ImageSliderProps {
  imageUrls: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  size?: number;
}

interface ExtendedCSSProperties extends React.CSSProperties {
  '--swiper-pagination-bottom'?: string;
  '--swiper-theme-color'?: string;
  '--swiper-pagination-bullet-inactive-color'?: string;
  '--swiper-pagination-bullet-inactive-opacity'?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  imageUrls,
  currentIndex,
  setCurrentIndex,
  size = 111,
}) => { 
  const customStyles: ExtendedCSSProperties = {
    '--swiper-pagination-bottom': '10px',
    '--swiper-theme-color': '#fff',
    '--swiper-pagination-bullet-inactive-color': '#fff',
    '--swiper-pagination-bullet-inactive-opacity': '0.4',
    width: '100%',
    height: '100%',
  };

  return (
    <SwiperContainer size={size}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        initialSlide={currentIndex}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        modules={[Pagination]}
        style={customStyles}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img
              src={imageUrl}
              alt={`Slide ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default ImageSlider;
