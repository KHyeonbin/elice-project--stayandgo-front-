import { useState, useEffect } from "react";
import { SlideModal } from "../../atoms/modalAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import favoriteOffImg from "../../assets/icons/favorite_off.png";
import SlideUpModal from "../layout/SlideUpModal";
import KakaoMap from "../layout/KakaoMap";

const SwiperDiv = styled.div`
  position: relative;
`;
const ImgBox = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
`;

const ImgDiv = styled.div`
  min-height: 100vw;
  background: ${(props) => (props.bg ? props.bg : "#ddd")};
  & img {
    width: 100%;
  }
`;

const Container = styled.div`
  padding: 0 15px 81px;
`;

const Title = styled.h2`
  font-size: 20px;
  padding: 15px 0 0;
`;

const InfoText = styled.p`
  font-size: 16px;
  padding: 20px 0 0;
  margin: 0;
`;

const MainOptionBox = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 25px 0 0;
  padding: 20px 0 15px;
  border-top: 1px solid #ddd;
`;

const MainOption = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  font-size: 16px;
`;

const RoomInfoDiv = styled.div`
  font-size: 16px;
  padding: 20px 0;
  border-top: 1px solid #ddd;

  & > p {
    font-size: 20px;
    margin: 0;
    padding-bottom: 15px;
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  & > button {
    background: none;
    border: none;
    font-size: 16px;
    margin-top: 15px;
    padding: 0;
    text-decoration: underline;
  }
`;

const LocationDiv = styled.div`
  padding: 20px 0;
  border-top: 1px solid #ddd;
  & p {
    font-size: 20px;
    padding: 0 0 20px;
    margin: 0;
  }
`;

const Location = styled.div`
  border-radius: 15px;
  overflow: hidden;
  background: #eee;
  height: 60vw;
`;

const HostInfoDiv = styled.div`
  padding: 20px 0;
  border-top: 1px solid #ddd;
  & > p {
    font-size: 20px;
    padding-bottom: 20px;
    margin: 0;
  }
`;

const HostText = styled.div`
  font-size: 16px;
  padding: 20px 0;
  border-top: 1px solid #ddd;

  & > p {
    font-size: 20px;
    margin: 0;
    padding-bottom: 15px;
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  & > button {
    background: none;
    border: none;
    font-size: 16px;
    margin-top: 15px;
    padding: 0;
    text-decoration: underline;
  }
`;

const OrderBtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
  background: #fff;
  border-top: 1px solid #ddd;
`;

const ReservationBtn = styled.button`
  font-size: 16px;
  padding: 0 15px;
  background: #f87878;
  color: #fff;
  height: 50px;
  border: 0;
  border-radius: 15px;
`;

const PriceDiv = styled.div`
  font-size: 16px;
  & p {
    font-size: 14px;
    margin: 0;
  }
`;

const ModalText = styled.div`
  padding-top: 20px;
  font-size: 16px;
`;

const RoomDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const setSlideModal = useSetRecoilState(SlideModal);
  const slideModal = useRecoilValue(SlideModal);

  // 방 정보 가져오기
  useEffect(() => {}, []);

  return (
    <>
      <SwiperDiv>
        <ImgBox>
          <img src={favoriteOffImg} />
        </ImgBox>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            console.log(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            console.log(swiper.realIndex);
          }}
          pagination={{ clickable: true }}
          style={{
            "--swiper-pagination-bottom": "10px",
            "--swiper-theme-color": "#fff",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": "0.4",
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
        </Swiper>
      </SwiperDiv>

      <Container>
        <Title>[옥탑방의 하루]</Title>
        <InfoText>
          가격 / 위치
          <br />
          최대 인원 2명 * 침실 1개 * 침대 1 * 욕실 1개
        </InfoText>
        <MainOptionBox>
          <MainOption>
            <img />
            최고의 전망
          </MainOption>
          <MainOption>
            <img />
            슈퍼호스트
          </MainOption>
          <MainOption>
            <img />
            서면 근처
          </MainOption>
          <MainOption>
            <img />
            셀프 체크인
          </MainOption>
        </MainOptionBox>

        <RoomInfoDiv>
          <p>숙소 소개</p>
          <div>
            독립된 공간의 단층(1층)형의 모던 스타일의 독채형 풀빌라로써
            프라이빗한 개인전용풀장(6MX3M), 개별 테라스와 잔디정원이 갖추어져
            있으며, 테라스에서 북유럽풍의 고급 바베큐 그릴로 개별 바베큐와
            캠프파이어장작으로 불멍을 즐길수 있습니다. 독립된 공간의
            단층(1층)형의 모던 스타일의 독채형 풀빌라로써 프라이빗한
            개인전용풀장(6MX3M), 개별 테라스와 잔디정원이 갖추어져 있으며,
            테라스에서 북유럽풍의 고급 바베큐 그릴로 개별 바베큐와
            캠프파이어장작으로 불멍을 즐길수 있습니다.
          </div>
          <button
            type="button"
            onClick={() => {
              setSlideModal(true);
            }}
          >
            더보기 >
          </button>
        </RoomInfoDiv>

        <LocationDiv>
          <p>숙소 위치</p>
          <Location>
            <KakaoMap />
          </Location>
        </LocationDiv>

        <HostInfoDiv>
          <p>호스트 소개</p>
          <HostText>
            <div>
              1. 국내 풀빌라 순위 TOP 5 2. 인기 휴가지 고급 풀빌라 TOP 5 3. 해외
              리조트 안 부러운 국내 럭셔리펜션 4. 동남아 부럽지 않은 국내
              프라이빗 풀빌라 TOP 5 5. 낭만 끝판왕 국내 럭셔리 풀빌라 BEST 5 6.
              물좋은 숙소, 수영장이 근사한 숙소 BEST5 7. 국내 여름 풀빌라 TOP 5
              8. 강원도 풀빌라 펜션 추천 BEST 4 커플여행 가족여행까지 9. 강원도
              힐링숙소 6곳 10. 국내 신혼여행지 &amp; 럭셔리 숙소 추천 11. 강원도
              신혼여행 떠난다면? 강원도 호텔, 풀빌라 추천 5
            </div>
            <button
              type="button"
              onClick={() => {
                setSlideModal(true);
              }}
            >
              더보기 >
            </button>
          </HostText>
        </HostInfoDiv>
      </Container>
      <OrderBtnDiv>
        <PriceDiv>
          <b>500,000원</b> / 박<p>8월11일~8월16일</p>
        </PriceDiv>
        <ReservationBtn>예약하기</ReservationBtn>
      </OrderBtnDiv>

      {slideModal && (
        <SlideUpModal>
          <h2>숙소 소개</h2>
          <ModalText>텍스트~~~~~~~~~~</ModalText>
        </SlideUpModal>
      )}
    </>
  );
};

export default RoomDetails;
