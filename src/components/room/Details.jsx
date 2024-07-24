import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";

const ImgDiv = styled.div`
  min-height: 100vw;
  background: #ddd;
`;

const RoomDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <>
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          console.log(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          console.log(swiper.realIndex);
        }}
      >
        <SwiperSlide>
          <ImgDiv bg="orange" />
        </SwiperSlide>
        <SwiperSlide>
          <ImgDiv bg="skyblue" />
        </SwiperSlide>
        <SwiperSlide>
          <ImgDiv bg="black" />
        </SwiperSlide>
        <SwiperSlide>
          <ImgDiv bg="pink" />
        </SwiperSlide>
        ...
      </Swiper>
    </>
  );
};

export default RoomDetails;
