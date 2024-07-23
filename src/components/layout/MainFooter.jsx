import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: white;
    border-top: 2px solid #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Item = styled.div`
    width: 25%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`
const ItemTitle = styled.span`
    font-size: 13px;
    color: #797979;
`
const ItemImg = styled.img`
    width: 24px;
    height: 24px;
`

const Footer = ({user}) => {
    // footer 메뉴 배열 및 상태 정의
    const menuArr = ["둘러보기", "여행", "나의숙소", "프로필"];
    const [menu, setMenu] = useState(menuArr[0]);

    // mainCatetory 디렉토리 이미지 가져오기
    const importAllImages = (v) => {
        return v.keys().map((key) => ({
            src: v(key),
            name: key.match(/[^/]+$/)[0], // 파일 이름만 추출
          }));
    };
    const normalImages = importAllImages(require.context('../../assets/icons/mainFooterMenu/normal', false, /\.(png|jpe?g|gif)$/));
    const clickedImages = importAllImages(require.context('../../assets/icons/mainFooterMenu/clicked', false, /\.(png|jpe?g|gif)$/));
    // 파일 이름 순으로 정렬
    const sortedImages = (images) => {
        const retImages = images.sort((a, b) => {
        const aNumber = parseInt(a.name.split('_')[0], 10);
        const bNumber = parseInt(b.name.split('_')[0], 10);
        return aNumber - bNumber;
        });
        return retImages;   
    };
    const normalSortImages = sortedImages(normalImages);
    const clickedSortImages = sortedImages(clickedImages);


    // 아이템 클릭 시 태그 상태 변화
    const onClickImage = (index) => {
        setMenu(menuArr[index]);
    };

    return (
        <Container>
            {normalSortImages.map((v, i) => (
                <Item key={i} onClick={() => onClickImage(i)}>
                    <ItemImg src={menu === menuArr[i] ? clickedImages[i].src : v.src} />
                    <ItemTitle style={menu === menuArr[i] ? {color: "#E81948", fontWeight: "bold"} : {color: "#797979", fontWeight: "500"}}>{menuArr[i]}</ItemTitle>
                </Item>
            ))}
        </Container>
    );
}

export default Footer;