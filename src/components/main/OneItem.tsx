import React, {useRef, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { calc } from "antd/es/theme/internal";
import { DotDivProps, DotProps, ItemBackgroundDivProps, OneItemProps, SearchType } from "../../model/main(with detail, upload)/mainTypes";

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
    z-index: 90;
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
const ItemBackgroundDiv = styled.div.attrs<ItemBackgroundDivProps>(props => ({
    style: {
        backgroundImage: `url(${props.$background})`,
    }
}))`
    width: 100%;
    height: 400px;
    border-radius: 20px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    opacity: 1;

    position: relative;

    @keyframes changeCarouselAniRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0%);
        opacity: 1;
    }
}

@keyframes changeCarouselAniLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
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
const DotDiv = styled.div.attrs<DotDivProps>(props => ({
    style: {
        // 10px : dot 의 width(10px) / 2 + gap (10px) / 2
        left: `calc(50% - (10px * ${props.$dotNum}) + 5px)`
    }
}))`
    position: absolute;
    bottom: 25%;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
`
const Dot = styled.div.attrs<DotProps>(props => ({
    style: {
        backgroundColor: props.$index === props.$imgIndex ? '#E61E51' : 'white'
    }
}))`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.7;
  z-index: 90;
`;


const OneItem : React.FC <OneItemProps> = ({v, startSearch}) => {
    // 캐러셀 이미지 인덱스
    const [index, setIndex] = useState<number>(0);
    // 캐러셀 이미지 배열
    const images = [v.main_image, ...v.sub_images];
    // 배경 div targetref 지정(translate left or right)
    const backgroundRef = useRef<HTMLDivElement | null>(null);

    // 아이템 좌 우 클릭 시 이전 다음 사진으로 변화
    const onClickItemImagePrev = () : void => {
        if(index === 0){
            setIndex(images.length - 1);
        } else {
            setIndex(index - 1);
        }
        if(backgroundRef && backgroundRef.current){
            backgroundRef.current.style.animation = "changeCarouselAniLeft 0.3s ease-out";
            // 애니메이션 효과에서 settimeout 사용
            setTimeout(() => {
                if(backgroundRef && backgroundRef.current){
                    backgroundRef.current.style.animation = "none";
                }
            }, 350);
        }
    }
    const onClickItemImageNext = () : void => {
        if(index === images.length - 1){
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        if(backgroundRef && backgroundRef.current){
            backgroundRef.current.style.animation = "changeCarouselAniRight 0.3s ease-out";
            // 애니메이션 효과에서 settimeout 사용
            setTimeout(() => {
                if(backgroundRef && backgroundRef.current){
                    backgroundRef.current.style.animation = "none";
                }
            }, 350);
        }
    }

    const formatObject = (obj: SearchType) => {
        return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
    }
    const formattedString : string = formatObject(startSearch);

    // 아이템 클릭 시 아이템 상세보기로 이동
    return (
            <ItemDiv id={v.nanoid}>
                <ItemImagePrev onClick={onClickItemImagePrev}>{"<"}</ItemImagePrev>
                <ItemImageNext onClick={onClickItemImageNext}>{">"}</ItemImageNext>
                {/* Link 컴포넌트에 state 를 같이 보내기 !!! (useLocation 으로 확인) */}
                <Link to={`/room/details/${v.nanoid}?${formattedString}`} state={{is_notLink: true}}>
                    <ItemBackgroundDiv ref={backgroundRef} $background={images[index]} />
                </Link>
                <DotDiv $dotNum={images.length} >
                    {images.map((v, i) => {
                        return (
                            <Dot key={i} $index={i} $imgIndex={index} />
                        )
                    })}
                </DotDiv>    
                <ItemTextDiv>
                    <ItemTitle>{v.title}<br /></ItemTitle>
                    <ItemNormalText>호스트: {v.authorInfo.photo && v.authorInfo.nickname+v.authorInfo.photo || v.authorInfo.nickname}<br /></ItemNormalText>
                    <ItemPriceText>{"₩" + Number(v.price).toLocaleString('ko-KR')}</ItemPriceText><ItemNormalText> / 1박</ItemNormalText>
                </ItemTextDiv>
            </ItemDiv>
    )
}

export default OneItem;