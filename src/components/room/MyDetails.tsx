import React, { useRef, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import SlideUpModal from "../layout/SlideUpModal";
import KakaoMap from "../layout/KakaoMap";
import { SlideModal } from "../../atoms/modalAtom";
import { tagArr } from "../../util/data/arrayStaticData";
import { detailPost } from "../../api/detailPost";
import { ContextImageData, CSSPropertiesExtended, WebpackRequireContext } from "../../model/main(with detail, upload)/mainTypes";

const SwiperDiv = styled.div` 
  position: relative;
  background: #eee;
  height: 110vw;
  max-height: 700px;
  & .swiper {
    height: 100%;
  }
`;

const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & img {
    height: 100%;
    width:100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  padding: 0 15px;
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
  & img {
    width: 24px;
    margin-right: 5px;
  }
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
  max-height: 400px;
`;

const LocationText = styled.div`
  font-size: 16px;
  padding-top: 10px;
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

const HostInfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  gap: 15px;
  & p {
    margin:0;
    font-size: 16px;
  }
`;

const HostName = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 5px;
`;

const HostImg = styled.div`
  font-size: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 68px;
`;

const HostPhone = styled.a`
  text-decoration: underline;
  font-size: 16px;
  display: inline-block;
  margin-top: 3px;
  & svg {
    vertical-align: middle;
    margin-right: 5px;
  }
`;

const HostText = styled.div`
  font-size: 16px;
  padding: 10px 0 0 0;


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
    padding:0;
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
const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 18px;
`

const RoomMyDetails = () => {
  const setSlideModal = useSetRecoilState(SlideModal);
  const slideModal = useRecoilValue(SlideModal);
  const sortedImages = useRef<ContextImageData[]>();
  const [query] = useSearchParams();
  const {id} = useParams();
  // sub_images, category, author 부분은 null, undefined 방지
  const [roomInfo, setRoomInfo] = useState({
    title: "",
    contents: "",
    main_image: "",
    price: 0,
    sub_images: [""],
    max_adult: 0,
    max_child: 0,
    max_baby: 0,
    room_num: 0,
    main_location: "",
    category: [""],
    sub_location: "",
    author: {name: "", photo: "", email: "", nickname: "", phone: ""},
    host_intro: ""
  });

  useEffect(() => {
    // 방 정보 가져오기
    detailPost({nanoid: id})
    .then(res => {
      if(res && res.data && res.data.code === 200){
        setRoomInfo(res.data.data);
      }
    })
    .catch(e => {
      console.log(e);
    });
    return;
  }, [id]);
  
  // mainCatetory 디렉토리 이미지 가져오기
  const importImages = (v: WebpackRequireContext) : ContextImageData[] => {
    return v.keys().map((key) => {
        const match = key.match(/[^/]+$/);
        return {
            src: v(key),
            name: match ? match[0] : 'unknown', // 파일 이름만 추출
        }
    });
};
  const images = importImages(require.context('../../assets/icons/mainCategory', false, /\.(png|jpe?g|gif)$/) as WebpackRequireContext);
  // 파일 이름 순으로 정렬
  sortedImages.current = images.sort((a, b) => {
    const aNumber = parseInt(a.name.split('_')[0], 10);
    const bNumber = parseInt(b.name.split('_')[0], 10);
    return aNumber - bNumber;
  });

  // roomInfo가 null일 경우 로딩 상태를 표시
  if (!roomInfo) {
    return <LoadingDiv>Loading...</LoadingDiv>;
  }

  const customStyle: CSSPropertiesExtended = {
    '--swiper-pagination-bottom': '10px',
    '--swiper-theme-color': '#fff',
    '--swiper-pagination-bullet-inactive-color': '#fff',
    '--swiper-pagination-bullet-inactive-opacity': '0.4',
  };

  return (
    <>
      <SwiperDiv>
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
          style={customStyle}
        >
            <SwiperSlide key={`slide0`}>
              <ImgDiv><img src={roomInfo.main_image}></img></ImgDiv>
            </SwiperSlide>
          {roomInfo.sub_images.length > 0 &&
          roomInfo.sub_images.map((img, i)=>{
          return (
            <SwiperSlide key={`slide${i + 1}`}>
              <ImgDiv><img src={img}></img></ImgDiv>
            </SwiperSlide>
          )
          })}
        </Swiper>
      </SwiperDiv>

      <Container>
        <Title>[{roomInfo.title}]</Title>
        <InfoText>
        {roomInfo.price.toLocaleString()}원 / {roomInfo.main_location}
          <br />
          최대 인원 {roomInfo.max_adult + roomInfo.max_baby + roomInfo.max_child}명 * 
          침실 {roomInfo.room_num}개
        </InfoText>
        <MainOptionBox>
          {roomInfo.category.length > 0 && 
          roomInfo.category.map((cate, i)=>
            tagArr.map((tag, ii) => {
              if(tag === cate) {
                return <MainOption key={i}><img src={sortedImages.current ? sortedImages.current[ii].src : ""} />{cate}</MainOption>
              }
              else {
                return null;
              }
            })
          )
        }
        </MainOptionBox>

        <RoomInfoDiv>
          <p>숙소 소개</p>
          {/* whiteSpace: "pre-wrap" 줄 바꿈 출력 css */}
          <div style={{whiteSpace: "pre-wrap"}}>
              {roomInfo.contents}
          </div>
          <button
            type="button"
            onClick={()=>setSlideModal(prev => ({
              isOpen: true,
              title: '숙소 소개',
              text: roomInfo.contents,
            }))}
          >
            더보기 &gt;
          </button>
        </RoomInfoDiv>

        <LocationDiv>
          <p>숙소 위치</p>
          <Location>
            <KakaoMap moveup={-1} address={roomInfo.sub_location} title={roomInfo.title} />
          </Location>
          <LocationText>{roomInfo.sub_location}</LocationText>
        </LocationDiv>

        <HostInfoDiv>
          <p>호스트 소개</p>
          <HostInfoBox>
            <HostImg>{roomInfo.author.photo}</HostImg>
            <div>
              <HostName>{roomInfo.author.nickname}({roomInfo.author.name})</HostName>
              <p>{roomInfo.author.email}</p>
              <HostPhone href={`tel:${roomInfo.author?.phone}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#333">
                  <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                </svg>
                {roomInfo.author.phone}
              </HostPhone>
            </div>
          </HostInfoBox>
          <HostText>
            {/* whiteSpace: "pre-wrap" 줄 바꿈 출력 css */}
            <div style={{whiteSpace: "pre-wrap"}}>
                {roomInfo.host_intro}
            </div>
            <button
              type="button"
              onClick={()=>setSlideModal(prev => ({
                isOpen: true,
                title: '호스트 소개',
                text: roomInfo.host_intro,
              }))}
            >
              더보기 &gt;
            </button>
          </HostText>
        </HostInfoDiv>
      </Container>

      {slideModal.isOpen && (
        <SlideUpModal title={slideModal.title} text={slideModal.text} />
      )}
    </>
  );
};

export default RoomMyDetails;
