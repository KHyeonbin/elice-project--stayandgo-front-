import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import footerState from "../../atoms/footerState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { ContextImageData, WebpackRequireContext } from "../../model/main(with detail, upload)/mainTypes";

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
    z-index: 9999;
    // 보은 추가
    max-width: 700px;
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

const Footer : React.FC = () => {
    // footer menu 전역 상태 확인 및 변경
    const setMenu = useSetRecoilState(footerState);
    const menu = useRecoilValue(footerState);

    // 클릭 시 해당 메뉴로 이동하기 위함
    const navigate = useNavigate();

    // 메뉴 페이지로 진입할 시 setMenu 를 적용하기 위함
    const location = useLocation();
    useEffect(() => {
        setMenu((current) => {
            const newMenu = {...current};
            const path = location.pathname;
            if(path === "/"  || path === '/upload' || path === '/upload/edit'){
                newMenu.menu = menu.menuArr[0];
            } else if(path === "/travel"){
                newMenu.menu = menu.menuArr[1];
            } else if(path === "/myaccommodation"){
                newMenu.menu = menu.menuArr[2];
            } else {
                newMenu.menu = menu.menuArr[3];
            }
            return newMenu;
        });
    // navigate 로 path 변경 시 location 의존성 주입으로 판단함
    },[location])

    // mainCatetory 디렉토리 이미지 가져오기
    const importAllImages = (v: WebpackRequireContext) : ContextImageData[] => {
        return v.keys().map((key) => {
            const match = key.match(/[^/]+$/);
            return {
                src: v(key),
                name: match ? match[0] : 'unknown', // 파일 이름만 추출
            }
        });
    };
    const normalImages = importAllImages(require.context('../../assets/icons/mainFooterMenu/normal', false, /\.(png|jpe?g|gif)$/) as WebpackRequireContext);
    const clickedImages = importAllImages(require.context('../../assets/icons/mainFooterMenu/clicked', false, /\.(png|jpe?g|gif)$/) as WebpackRequireContext);
    // 파일 이름 순으로 정렬
    const sortedImages = (images: ContextImageData[]) : ContextImageData[] => {
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
    const onClickImage = (index: number) : void => {
        // navigate 추가
        if(index === 0){
            navigate('/');
        } else if(index === 1){
            navigate('/travel');
        } else if(index === 2){
            navigate('/myaccommodation');
        } else if(index === 3){
            navigate('/profile');
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