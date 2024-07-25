import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import footerState from "../../atoms/footerState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 60px;
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
    width: 22px;
    height: 22px;
`

const Footer = ({user}) => {
    // footer menu 전역 상태 확인 및 변경
    const setMenu = useSetRecoilState(footerState);
    const menu = useRecoilValue(footerState);

    // 클릭 시 해당 메뉴로 이동하기 위함
    const navigate = useNavigate();

    // 메뉴 페이지로 진입할 시 setMenu 를 적용하기 위함
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
        setMenu((current) => {
            const newMenu = {...current};
            const path = location.pathname;
            if(path === "/"){
                newMenu.menu = menu.menuArr[0];
            } else if(path === "/reservation"){
                newMenu.menu = menu.menuArr[1];
            } else if(path === "/history"){
                newMenu.menu = menu.menuArr[2];
            }
            return newMenu;
        });
    },[])

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


    // 아이템 클릭 시 해당 메뉴 페이지로 이동
    const onClickImage = (index) => {
        // navigate 추가
        if(index === 0){
            navigate('/');
        } else if(index === 1){
            navigate('/reservation');
        } else if(index === 2){
            navigate('/history');
        }
    };

    return (
        <Container>
            {normalSortImages.map((v, i) => (
                <Item key={i} id={menu.menuArr[i]} onClick={() => onClickImage(i)}>
                    <ItemImg src={menu.menu === menu.menuArr[i] ? clickedSortImages[i].src : v.src} />
                    <ItemTitle style={menu.menu === menu.menuArr[i] ? {color: "#E81948", fontWeight: "bold"} : {color: "#797979", fontWeight: "500"}}>{menu.menuArr[i]}</ItemTitle>
                </Item>
            ))}
        </Container>
    );
}

export default Footer;