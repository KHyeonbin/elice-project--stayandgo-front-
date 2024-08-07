import styled from "styled-components";

interface ItemProps {
  reverse?: boolean;
}

export const Container = styled.div`
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h1`
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
export const Item = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  margin: 35px 25px;
  //태블릿으로 볼때, item 항목에 reverse가 있으면 역순배열 없으면 정배열
  @media (min-width: 500px) {
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  }
`;
export const VideoWrapper = styled.div`
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
export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; //부모요소 가득채우기
`;
export const DescriptionWrapper = styled.div`
  @media (min-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    width: 60%;
  }
`;
export const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 15px;

  @media (min-width: 500px) {
    font-size: 28px;
    line-height: 34px;
  }
`;
export const Description = styled.span`
  font-size: 18px;
  line-height: 20px;
  word-break: keep-all;

  @media (min-width: 500px) {
    font-size: 24px;
    line-height: 30px;
  }
`;
export const SearchContent = styled.div`
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
export const SearchText = styled.h2`
  font-weight: bold;
  width: 130px;
  font-size: 26px;
  line-height: 30px;
  word-break: keep-all;
`;
export const SearchButton = styled.button`
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
