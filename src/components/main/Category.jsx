import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { tagArr } from "../../util/data/arrayStaticData";

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: white;
    
    border-bottom: 2px solid #EEEEEE;
    padding-top: 10px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // x축 scroll 작업
    overflow: hidden;
    ::-webkit-scrollbar {
        display: none;
    }
`
const ItemDiv = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 5px;
    // x축 scroll 작업
    overflow-x: auto;
    
    // oneline
    flex-wrap: nowrap;
    
	/* 브라우저가 scroll-snap-type을 지원할 때 */
    @supports (scroll-snap-type: x mandatory) {
        // 스크롤 시 하나씩 넘기기
        scroll-snap-type: x mandatory;
        /* 끝에서 바운스 되도록 */
        -webkit-overflow-scrolling: touch;
    }
`

const Item = styled.div`
    width: 25%;
    height: 98%;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // + "이미지 크기 고정" 작업(div > img 구조 + div 에서 flex-frow, shrink, basis(절대 크기) 설정 !)
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 75px;
    cursor: pointer;
    /* 브라우저가 scroll-snap-type을 지원할 때 */
    @supports (scroll-snap-align: start) {
        // 스크롤 시 하나씩 넘기기(아이템)
        scroll-snap-align: start;
    }
`
const ItemTitle = styled.span`
    font-size: 12px;
    color: #797979;
`
const ItemImg = styled.img`
    width: 24px;
    height: 24px;
`


const Category = ({setCategory, setPage}) => {
    // 태그 배열 및 상태 정의
    const [tag, setTag] = useState(tagArr[0]);

    // 태그(카테고리) 변경될 때 setCategory 작업으로 category 상태 변경
    useEffect(() => {
        setCategory(tag);
        // y 축 휠 동작 시 x 축 스크롤로 변환 핸들러
        const handleWheel = (e) => {
            // X축 스크롤로 변환
            if (e.deltaY !== 0) {
                e.preventDefault();
                const scrollAmount = e.deltaY;
                e.currentTarget.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        };
        // 휠 동작 시 x 축 스크롤로 변환하기 위한 쿼리 셀렉터
        const element = document.querySelector('.scrollable-container');
        if (element) {
            element.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };

    },[tag])

    // mainCatetory 디렉토리 이미지 가져오기
    const importAllImages = (v) => {
        return v.keys().map((key) => ({
            src: v(key),
            name: key.match(/[^/]+$/)[0], // 파일 이름만 추출
          }));
    };
    const images = importAllImages(require.context('../../assets/icons/mainCategory', false, /\.(png|jpe?g|gif)$/));

    // 파일 이름 순으로 정렬
    const sortedImages = images.sort((a, b) => {
        const aNumber = parseInt(a.name.split('_')[0], 10);
        const bNumber = parseInt(b.name.split('_')[0], 10);
        return aNumber - bNumber;
    });
    // 아이템 클릭 시 태그 상태 변화
    const onClickImage = (index) => {
        setTag(tagArr[index]);
        setPage((current) => {
            const newPage = {...current};
            newPage.page = 1;
            return newPage;
        });
    };

    return (
        <Container>
            <ItemDiv className="scrollable-container">
                {sortedImages.map((v, i) => (
                    <Item key={i} onClick={() => onClickImage(i)} style={tag === tagArr[i] ? {borderBottom: "2px solid #333"} : {borderBottom: "none"}}>
                        <ItemImg src={v.src} />
                        <ItemTitle style={tag === tagArr[i] ? {fontWeight: "bold"} : {fontWeight: "500"}}>{tagArr[i]}</ItemTitle>
                    </Item>
                ))}
            </ItemDiv>
        </Container>
    );
}

export default Category;