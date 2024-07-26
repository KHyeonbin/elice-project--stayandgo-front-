import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  line-height: 40px;
  margin: 35px 25px;
  text-align: center;
  word-break: keep-all;

  @media (min-width: 500px) {
    font-size: 46px;
    line-height: 52px;
    text-align: center;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 25px;
  //태블릿으로 볼때, item 항목에 reverse가 있으면 역순배열 없으면 정배열
  @media (min-width: 500px) {
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 320px;
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;

  @media (min-width: 500px) {
    width: 40%;
    height: 350px;
    margin-bottom: 0;
  }
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; //부모요소 가득채우기
`;

const DescriptionWrapper = styled.div`
  @media (min-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    width: 60%;
  }
`;
const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 15px;

  @media (min-width: 500px) {
    font-size: 28px;
    line-height: 34px;
  }
`;
const Description = styled.span`
  font-size: 18px;
  line-height: 20px;
  word-break: keep-all;

  @media (min-width: 500px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("https://a0.muscache.com/im/pictures/31d0f66f-2cc3-43bb-a96d-a5faf574df44.jpg?im_w=720");
  background-size: cover;
  background-position: center;
  margin-top: 25px;
  padding: 25px;
  width: 100%;
  height: 320px;
`;
const SearchText = styled.h2`
  font-weight: bold;
  width: 130px;
  font-size: 26px;
  line-height: 30px;
  word-break: keep-all;
`;
const SearchButton = styled.button`
  margin-top: 30px;
  width: 160px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f87878;
  color: white;
  font-size: 16px;
  line-height: 19.36px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fb9d9d;
  }
`;

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Container>
      <Title>3단계로 간편하게 떠나는 여행</Title>
      <Item>
        <VideoWrapper>
          <Video autoPlay muted loop>
            <source src="https://stream.media.muscache.com/2LWTbHQOw00D7p4pMSgGT014nn7eIPYOUymel7oWuos02w.mp4?v_q=high" />
          </Video>
        </VideoWrapper>
        <DescriptionWrapper>
          <SubTitle>1. 검색</SubTitle>
          <Description>
            먼저 숙소나 체험을 둘러보며 마음에 드는 것을 찾으세요. 집 전체 숙소,
            셀프 체크인, 반려동물 허용 등 필터를 적용해 검색 결과를 좁힐 수
            있습니다. 마음에 드는 숙소나 체험은 위시리스트에 저장할 수도
            있습니다.
          </Description>
        </DescriptionWrapper>
      </Item>
      <Item reverse>
        <VideoWrapper>
          <Video autoPlay muted loop>
            <source src="https://stream.media.muscache.com/ebfLKmZB5GcTjBWPXxabO3QsCA01yJ00Lw5fNGub4ehpE.mp4?v_q=high" />
          </Video>
        </VideoWrapper>
        <DescriptionWrapper>
          <SubTitle>2. 예약</SubTitle>
          <Description>
            마음에 드는 숙소나 체험을 찾아 호스트 소개, 이전 게스트가 남긴 후기,
            예약 취소 옵션을 모두 살펴보았다면 클릭 몇 번으로 간단히 예약을
            완료하세요.
          </Description>
        </DescriptionWrapper>
      </Item>
      <Item>
        <VideoWrapper>
          <Video autoPlay muted loop>
            <source src="https://stream.media.muscache.com/00CVIvJJU00Php2vhKmGuUEfNtXCW1Eik5lxR00UCCC01Lc.mp4?v_q=high" />
          </Video>
        </VideoWrapper>
        <DescriptionWrapper>
          <SubTitle>3. 여행</SubTitle>
          <Description>
            모든 준비가 끝났습니다! 앱을 이용해 호스트에게 연락하여 궁금한
            사항을 질문하고 여행지 정보나 팁을 얻으세요. 다른 도움이 필요한
            부분이 있다면 언제든 에어비앤비에 연락하실 수도 있습니다.
          </Description>
        </DescriptionWrapper>
      </Item>
      <SearchContent>
        <SearchText>숙소를 둘러보세요</SearchText>
        <SearchButton onClick={handleClick}>지금 둘러보기</SearchButton>
      </SearchContent>
    </Container>
  );
};

export default About;
