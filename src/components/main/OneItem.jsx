import React, {useRef, useState} from "react";
import styled from "styled-components";

const ItemDiv = styled.div`
    width: 90%;
    height: 500px;
    border: none;
    cursor: pointer;
    position: relative;
`
const ItemImagePrev = styled.div`
    cursor: pointer;
    position: absolute;
    bottom: 52%;
    z-index: 100;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    text-align: center;
    font-size: 27px;
    font-weight: bold;
    color: #FF385C;
`
const ItemImageNext = styled(ItemImagePrev)`
    right: 0%;
`
const ItemBackgroundDiv = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.$background})`,
    }
}))`
    width: 100%;
    height: 400px;
    border-radius: 20px;

    background-size: cover;
    background-repeat: no-repeat;

    opacity: 1;

    @keyframes changeCaraselAni {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0%);
            opacity: 1;
        }
    }
`
const ItemTextDiv = styled.div`
    width: 90%;
    padding-top: 10px;
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

const OneItem = ({v}) => {
    // 캐러셀 이미지 인덱스
    const [index, setIndex] = useState(0);
    // 캐러셀 이미지 배열
    const images = [v.main_image, ...v.sub_images];
    // 배경 div targetref 지정(translate left or right)
    const backgroundRef = useRef(null);

    // 아이템 좌 우 클릭 시 이전 다음 사진으로 변화
    const onClickItemImagePrev = () => {
        if(index === 0){
            setIndex(images.length - 1);
        } else {
            setIndex(index - 1);
        }
        backgroundRef.current.style.animation = "changeCaraselAni 0.3s ease-out";
        setTimeout(() => {
            backgroundRef.current.style.animation = "none";
        }, 350);
    }
    const onClickItemImageNext = () => {
        if(index === images.length - 1){
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        backgroundRef.current.style.animation = "changeCaraselAni 0.3s ease-out";
        setTimeout(() => {
            backgroundRef.current.style.animation = "none";
        }, 350);
    }

    // 아이템 클릭 시 아이템 상세보기로 이동
    const onClickItemDetail = (nanoid) => {
        console.log(nanoid);
    }

    return (
        <ItemDiv id={v.nanoid}>
                    <ItemImagePrev onClick={onClickItemImagePrev}>{"<"}</ItemImagePrev>
                    <ItemImageNext onClick={onClickItemImageNext}>{">"}</ItemImageNext>
                    <ItemBackgroundDiv ref={backgroundRef} onClick={() => onClickItemDetail(v.nanoid)} $background={images[index]} />
                    <ItemTextDiv>
                        <ItemTitle>{v.title}<br /></ItemTitle>
                        <ItemNormalText>호스트: {v.author.photo && v.author.nickname+v.author.photo || v.author.nickname}<br /></ItemNormalText>
                        <ItemPriceText>{"₩" + Number(v.price).toLocaleString('ko-KR')}</ItemPriceText><ItemNormalText> /인</ItemNormalText>
                    </ItemTextDiv>
        </ItemDiv>
    )
}

export default OneItem;