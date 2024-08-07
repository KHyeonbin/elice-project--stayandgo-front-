import React from "react";
import { useNavigate } from "react-router-dom";
import * as Ab from "./About.style"

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Ab.Container>
      <Ab.Title>3단계로 간편하게 떠나는 여행</Ab.Title>
      <Ab.Item>
        <Ab.VideoWrapper>
          <Ab.Video autoPlay muted loop playsInline>
            <source src="https://stream.media.muscache.com/2LWTbHQOw00D7p4pMSgGT014nn7eIPYOUymel7oWuos02w.mp4?v_q=high" />
          </Ab.Video>
        </Ab.VideoWrapper>
        <Ab.DescriptionWrapper>
          <Ab.SubTitle>1. 검색</Ab.SubTitle>
          <Ab.Description>
            먼저 홈페이지를 둘러보며 마음에 드는 숙소를 찾으세요. 
            국내 아름다운 명소와 다양한 숙소들을 지역, 날짜, 게스트 등 원하는 필터를 적용해 
            검색 결과를 좁힐 수 있습니다.
          </Ab.Description>
        </Ab.DescriptionWrapper>
      </Ab.Item>
      <Ab.Item reverse>
        <Ab.VideoWrapper>
          <Ab.Video autoPlay muted loop playsInline>
            <source src="https://stream.media.muscache.com/ebfLKmZB5GcTjBWPXxabO3QsCA01yJ00Lw5fNGub4ehpE.mp4?v_q=high" />
          </Ab.Video>
        </Ab.VideoWrapper>
        <Ab.DescriptionWrapper>
          <Ab.SubTitle>2. 예약</Ab.SubTitle>
          <Ab.Description>
            마음에 드는 숙소를 찾아 사진, 위치, 호스트 소개, 예약 취소 옵션을 
            모두 살펴보았다면 단 한번의 클릭으로 간단히 예약을 완료하세요.
          </Ab.Description>
        </Ab.DescriptionWrapper>
      </Ab.Item>
      <Ab.Item>
        <Ab.VideoWrapper>
          <Ab.Video autoPlay muted loop playsInline>
            <source src="https://stream.media.muscache.com/00CVIvJJU00Php2vhKmGuUEfNtXCW1Eik5lxR00UCCC01Lc.mp4?v_q=high" />
          </Ab.Video>
        </Ab.VideoWrapper>
        <Ab.DescriptionWrapper>
          <Ab.SubTitle>3. 여행</Ab.SubTitle>
          <Ab.Description>
            모든 준비가 끝났습니다! 다른 도움이 필요한 부분이 있다면 
            언제든 Q&A 챗봇을 통해 스테이앤고에 문의하실수도 있습니다.
            추억에 남을 행복한 여행이 되시기를 바랍니다.
          </Ab.Description>
        </Ab.DescriptionWrapper>
      </Ab.Item>
      <Ab.SearchContent>
        <Ab.SearchText>숙소를 둘러보세요</Ab.SearchText>
        <Ab.SearchButton onClick={handleClick}>지금 둘러보기</Ab.SearchButton>
      </Ab.SearchContent>
    </Ab.Container>
  );
};

export default About;
