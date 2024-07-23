import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    // 임시
    height: 10000px;
`
const ItemDiv = styled.div`
    width: 100%;
    height: 400px;
    border: none;
    cursor: pointer;

    opacity: 0;
    transition: opacity 1s;
`
const ItemBackgroundDiv = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.$background})`,
    }
}))`
    width: 100%;
    height: 300px;
    border-radius: 20px;

    background-size: cover;
    background-position: center;
`
const ItemTextDiv = styled.div`
    width: 90%;
    margin-top: 10px;
`
const ItemTitle = styled.span`
    font-size: 15px;
    font-weight: 500;
`
const ItemNormalText = styled.span`
    font-size: 13px;
    font-weight: 400;
`
const ItemPriceText = styled.span`
    font-size: 13px;
    font-weight: 600;
`

const Pagenation_div = styled.div`
    width: 100%;
    height: 40px;
    font-size: 20px;
    margin: 0 auto;
    margin-top: 5%;
`
const Pagenation_ul = styled.ul`
    width: 100%;
    height: 100%;
    // ul list 그룹의 기본 들여쓰기 제거 (padding-left 0)
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Pagenation_span = styled.span`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;
    color: #797979;
 
    &:hover {
        color: #E61E51;
    }
`
const Pagenation_li = styled.li`
    width: 10px;
    list-style: none;
    cursor: pointer;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }
`

const Items = () => {

    // IntersectionObserver 를 생성하여 targetRef 가 관찰될 때(.isIntersecting) 투명도를 n 초동안 높이기 위함
    // useRef [] 배열로 관리하기 !
    const targetRef = useRef([]);
    // scroll animation 동작 구현
    useEffect(() => {
        const osv = new IntersectionObserver((e) => {
            e.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.style.opacity = "1";
                } else {
                    entry.target.style.opacity = "0";
                }
            })
        },{
            threshold: 0.25
        });

        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[]);

    // 임시로 이미지 가져오기(원래 db 에서 조회된 결과 추출)
    const importAllImages = (v) => {
        return v.keys().map((key) => ({
            src: v(key),
            name: key.match(/[^/]+$/)[0], // 파일 이름만 추출
          }));
    };
    const images = importAllImages(require.context('../../assets/images', false, /\.(png|jpe?g|gif|webp)$/));

    // 가져온 이미지를 파일 이름 순으로 정렬
    const sortedImages = images.sort((a, b) => {
        const aNumber = parseInt(a.name.split('_')[0], 10);
        const bNumber = parseInt(b.name.split('_')[0], 10);
        return aNumber - bNumber;
    });


    return (
        <Container>
            {sortedImages.map((v, i) => (
                <ItemDiv key={i} ref={element => targetRef.current[i] = element}>
                    <ItemBackgroundDiv $background={v.src} />
                    <ItemTextDiv>
                        <ItemTitle>엑스 멘션에서 훈련하기<br /></ItemTitle>
                        <ItemNormalText>호스트: jubilee님<br /></ItemNormalText>
                        <ItemPriceText>{"₩" + Number("52884").toLocaleString('ko-KR')}</ItemPriceText><ItemNormalText> /인</ItemNormalText>
                    </ItemTextDiv>
                </ItemDiv>
            ))}
            <Pagenation_div>
                <Pagenation_ul>
                    <Pagenation_span>{"<<"}</Pagenation_span>
                    <Pagenation_li>1</Pagenation_li>
                    <Pagenation_li>2</Pagenation_li>
                    <Pagenation_li>3</Pagenation_li>
                    <Pagenation_span>{">>"}</Pagenation_span>
                </Pagenation_ul>
            </Pagenation_div>
        </Container>
    );
};

export default Items;