import React,{useState, useEffect} from "react";
import styled from "styled-components";
import searchImg from "../../assets/icons/search.png";
import whiteSearchImg from "../../assets/icons/white_search.png";
import closeImg from "../../assets/icons/close.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getDateFormat} from '../../util/getDateFormat';

const Container = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SearchContainer = styled.div`
    width: 90%;
    height: 70%;
    border-radius: 100px;
    border-color: #EEEEEE;
    box-shadow: 0 0 10px 7px #EEEEEE;
    cursor: pointer;
    
    display: flex;
    align-items: center;
`
const SearchImg = styled.img`
    width: 24px;
    height: 24px;

    margin-left: 20px;
`
const SearchDiv = styled.div`
    width: 300px;
    height: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`
const SearchTitle = styled.span`
    font-size: 13px;
    font-weight: 500;
`
const SearchSub = styled.span`
    font-size: 10px;
    font-weight: 300;
    color: #818181;
`
// 모달 오버레이
const ModalOverlay = styled.div`
    position: fixed;
    background-color: #EEEEEE;

    width: 100%;
    height: 100%;
    overflow-y: none;
    z-index: 101;
`
// 모달 컨테이너 div
const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 95%;
    height: 100%;
    transform: translate(-50%, -50%); 
    scrollbar-width: none;
    
    opacity: 1;
    transition: all 0.5s;
    @keyframes modalOpenAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

const CloseDiv = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #B1B1B1;
    border-radius: 50px;
    margin-top: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const CloseImg = styled.img`
    width: 13px;
    height: 13px;
`
// 숙소 이름 검색, 날짜 조회, 여행자 선택 div
const ModalContent = styled.div`
    width: 100%;
    height: 7%;
    border-radius: 30px;
    background-color: white;
    margin-top: 10px;

    display: flex;
    align-items: center;
`

const SearchSelect = styled.select`
    margin: 0 auto;
    width: 60%;
    height: 35%;
    border: none;
    font-size: 15px;
    color: #666666;
    background-color: white;

    &:focus{
        outline: none;
        box-shadow: none;
    }
`
const SearchSelectOption = styled.option`
`
// date 선택 부분
const ModalContentBigger = styled(ModalContent)`
    padding: 20px 15px 20px 15px;
    padding-top: 20px;
    height: 22%;
    display: block;
`
const ModalcontentBiggerTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
`
const BiggerDivSub = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BiggerDivSubTitle = styled.span`
    width: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #6E6E6E;
`
const DatepickerCustom = styled(DatePicker)`
    width: 100px;
    background-color: white;
    color: #E61E51;
    border: none;
    text-decoration: underline;
    font-size: 15px;
`
// 인원 선택 부분
const ModalContentBigger2 = styled(ModalContentBigger)`
    height: 45%;
`
const BiggerDivSub2 = styled(BiggerDivSub)`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const GuestItem = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EBEBEB;
`
const GuestTitle = styled.div`
    width: 60px;
`
const GuestTitleMain = styled.span`
    font-size: 16px;
`
const GuestTitleSub = styled.span`
    color: #6E6E6E;
    font-size: 13px;
`
const GuestSettingDiv = styled.div`
    width: 150px;
    display: flex;
    justify-content: center;
    gap: 15px;
`
const GuestSettingMinus = styled.div.attrs(props => ({
    style: {
        border: props.$adult === 0 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
    width: 30px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const GuestSettingMinusText = styled.span.attrs(props => ({
    style: {
        color: props.$adult === 0 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 27px;
`
const GuestSettingInput = styled.input`
    width: 30px;
    font-size: 15px;
    border: none;
    background-color: white;
`
const GuestSettingPlus = styled(GuestSettingMinus).attrs(props => ({
    style: {
        border: props.$adult === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingPlusText = styled(GuestSettingMinusText).attrs(props => ({
    style: {
        color: props.$adult === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`
const GuestSettingChildMinus = styled(GuestSettingMinus).attrs(props => ({
    style: {
        border: props.$child === 0 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingChildMinusText = styled(GuestSettingMinusText).attrs(props => ({
    style: {
        color: props.$child === 0 ? "#EBEBEB" : "#333",
    }
}))`
`
const GuestSettingChildPlus = styled(GuestSettingMinus).attrs(props => ({
    style: {
        border: props.$child === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingChildPlusText = styled(GuestSettingMinusText).attrs(props => ({
    style: {
        color: props.$child === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`
const GuestSettingBabyMinus = styled(GuestSettingMinus).attrs(props => ({
    style: {
        border: props.$baby === 0 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingBabyMinusText = styled(GuestSettingMinusText).attrs(props => ({
    style: {
        color: props.$baby === 0 ? "#EBEBEB" : "#333",
    }
}))`
`
const GuestSettingBabyPlus = styled(GuestSettingMinus).attrs(props => ({
    style: {
        border: props.$baby === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingBabyPlusText = styled(GuestSettingMinusText).attrs(props => ({
    style: {
        color: props.$baby === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`

const ModalFooter = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: white;

    display: flex;
    justify-content: space-around;
    align-items: center;

    opacity: 1;
    transition: all 0.5s;
    @keyframes modalOpenAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`
const FooterDelSpan = styled.span`
    width: 60%;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
`
const FooterSearchBtn = styled.button`
    width: 110px;
    height: 70%;

    border: none;
    border-radius: 10px;
    background-color: #E61E51;
    transition: background-color 0.5s;
    cursor: pointer;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    &:hover{
        background-color: #F0285B;
    }
`
const WhiteSearchImg = styled(SearchImg)`
    margin-left: 0;
`
const SearchBtnSpan = styled.span`
    font-size: 16px;
    color: white;
`



const Search = ({search, setSearch, isModal, setIsModal}) => {
    // 검색 초기 값 *(전체 삭제 클릭 시 해당 기본 값으로 모두 초기화됨)
    const defaultValue = {
        city: "지역을 선택하세요",
        startDate: getDateFormat(new Date()),
        endDate: getDateFormat(new Date()),
        adult: 0,
        child: 0,
        baby: 0
    }
    
    // 시작 날짜, 끝 날짜 state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // 시작 날짜, 끝 날짜 검색 데이터에 반영
    useEffect(() => {
        setSearch((current) => {
            const newSearch = {...current};
            const startD = getDateFormat(startDate);
            const endD = getDateFormat(endDate);
            
            newSearch.endDate = endD;
            newSearch.startDate = startD;
            return newSearch;
        });
    },[startDate, endDate])
    // 어린이, 유아 1명 이상일 때 성인 1명 동반
    useEffect(() => {
        if(search.adult === 0 && (search.child > 0 || search.baby > 0)){
            setSearch((current) => {
                const newSearch = {...current};
                newSearch.adult++;
                return newSearch;
            });
        }
    },[search])
    

    // 클릭 시 모달 활성화
    const onClickModal = () => {
        setIsModal(true);
        document.body.style.overflowY = "hidden";
    };
    // x 버튼 클릭 시 모달 비활성화
    const onClickModalClose = () => {
        setIsModal(false);
        document.body.style.overflowY = "auto";
    };
    // 지역 셀렉트 박스 이벤트 핸들러
    const onChangeSelect = (e) => {
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.city = e.target.value;
            return newSearch;
        });
    };
    // adult minus 핸들러
    const onClickAdultMinus = () => {
        if(search.adult === 0){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.adult--;
            return newSearch;
        });
    };
    // adult plus 핸들러
    const onClickAdultPlus = () => {
        if(search.adult === 10){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.adult++;
            return newSearch;
        });
    };
    // child minus 핸들러
    const onClickChildMinus = () => {
        if(search.child === 0){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.child--;
            return newSearch;
        });
    };
    // child plus 핸들러
    const onClickChildPlus = () => {
        if(search.child === 5){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.child++;
            return newSearch;
        });
    };
    // baby minus 핸들러
    const onClickBabyMinus = () => {
        if(search.baby === 0){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.baby--;
            return newSearch;
        });
    };
    // baby plus 핸들러
    const onClickBabyPlus = () => {
        if(search.baby === 5){
            return;
        }
        setSearch((current) => {
            const newSearch = {...current};
            newSearch.baby++;
            return newSearch;
        });
    };


    // 전체 삭제 클릭 시 이벤트 핸들러
    const onClickSearchReset = () => {
        setSearch(defaultValue);
    };

    console.log(search);

    return (
        <>
            {isModal &&
                <>
                    <ModalOverlay>
                        <ModalContainer style={isModal ? {animation: "modalOpenAnimation 1s"} : {animation: "none"}}>
                            <CloseDiv onClick={onClickModalClose}><CloseImg src={closeImg}/></CloseDiv>
                            <ModalContent>
                                <SearchImg src={searchImg} style={{margin: "0 auto"}}/>
                                <SearchSelect onChange={onChangeSelect} value={search.city}>
                                    <SearchSelectOption value="지역을 선택하세요" disabled>지역을 선택하세요</SearchSelectOption>
                                    <SearchSelectOption value="서울">서울</SearchSelectOption>
                                    <SearchSelectOption value="제주도">제주도</SearchSelectOption>
                                    <SearchSelectOption value="부산">부산</SearchSelectOption>
                                    <SearchSelectOption value="대구">대구</SearchSelectOption>
                                    <SearchSelectOption value="인천">인천</SearchSelectOption>
                                    <SearchSelectOption value="광주">광주</SearchSelectOption>
                                    <SearchSelectOption value="대전">대전</SearchSelectOption>
                                    <SearchSelectOption value="울산">울산</SearchSelectOption>
                                    <SearchSelectOption value="세종">세종</SearchSelectOption>
                                    <SearchSelectOption value="경기도">경기도</SearchSelectOption>
                                    <SearchSelectOption value="강원도">강원도</SearchSelectOption>
                                    <SearchSelectOption value="충청북도">충청북도</SearchSelectOption>
                                    <SearchSelectOption value="충청남도">충청남도</SearchSelectOption>
                                    <SearchSelectOption value="전라북도">전라북도</SearchSelectOption>
                                    <SearchSelectOption value="전라남도">전라남도</SearchSelectOption>
                                    <SearchSelectOption value="경상북도">경상북도</SearchSelectOption>
                                    <SearchSelectOption value="경상남도">경상남도</SearchSelectOption>
                                </SearchSelect>
                            </ModalContent>
                            <ModalContentBigger>
                                <ModalcontentBiggerTitle>여행 날짜는 언제인가요?</ModalcontentBiggerTitle>
                                <BiggerDivSub>
                                        <DatepickerCustom value={search.startDate} 
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={new Date()} // minDate 이전 날짜 선택 불가
                                            maxDate={new Date('2025-12-30')} // maxDate 이후 날짜 선택 불가
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            disabledKeyboardNavigation // 키보드 비활성화
                                            onFocus={e => e.target.blur()} // 키보드 비활성화
                                        />
                                        <BiggerDivSubTitle>~</BiggerDivSubTitle>
                                        <DatepickerCustom value={search.endDate} 
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={startDate} // minDate 이전 날짜 선택 불가
                                            maxDate={new Date('2025-12-30')} // maxDate 이후 날짜 선택 불가
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            disabledKeyboardNavigation // 키보드 비활성화
                                            onFocus={e => e.target.blur()} // 포커스를 받을 때 자동으로 blur() 호출하여 키보드 비활성화
                                        />
                                </BiggerDivSub>
                            </ModalContentBigger>
                            <ModalContentBigger2>
                                <ModalcontentBiggerTitle>게스트는 누구인가요?</ModalcontentBiggerTitle>
                                <BiggerDivSub2>
                                    <GuestItem>
                                        <GuestTitle>
                                            <GuestTitleMain>성인<br/></GuestTitleMain>
                                            <GuestTitleSub>13세 이상</GuestTitleSub>
                                        </GuestTitle>
                                        <GuestSettingDiv>
                                            <GuestSettingMinus onClick={onClickAdultMinus} $adult={search.adult}>
                                                <GuestSettingMinusText $adult={search.adult}>-</GuestSettingMinusText>
                                            </GuestSettingMinus>
                                            <GuestSettingInput value={search.adult} readOnly/>
                                            <GuestSettingPlus onClick={onClickAdultPlus} $adult={search.adult}>
                                            <GuestSettingPlusText $adult={search.adult}>+</GuestSettingPlusText>
                                            </GuestSettingPlus>
                                        </GuestSettingDiv>
                                    </GuestItem>
                                    <GuestItem>
                                        <GuestTitle>
                                            <GuestTitleMain>어린이<br/></GuestTitleMain>
                                            <GuestTitleSub>2~12세</GuestTitleSub>
                                        </GuestTitle>
                                        <GuestSettingDiv>
                                            <GuestSettingChildMinus onClick={onClickChildMinus} $child={search.child}>
                                                <GuestSettingChildMinusText $child={search.child}>-</GuestSettingChildMinusText>
                                            </GuestSettingChildMinus>
                                            <GuestSettingInput value={search.child} readOnly/>
                                            <GuestSettingChildPlus onClick={onClickChildPlus} $child={search.child}>
                                            <GuestSettingChildPlusText $child={search.child}>+</GuestSettingChildPlusText>
                                            </GuestSettingChildPlus>
                                        </GuestSettingDiv>
                                    </GuestItem>
                                    <GuestItem>
                                        <GuestTitle>
                                            <GuestTitleMain>유아<br/></GuestTitleMain>
                                            <GuestTitleSub>2세 미만</GuestTitleSub>
                                        </GuestTitle>
                                        <GuestSettingDiv>
                                            <GuestSettingBabyMinus onClick={onClickBabyMinus} $baby={search.baby}>
                                                <GuestSettingBabyMinusText $baby={search.baby}>-</GuestSettingBabyMinusText>
                                            </GuestSettingBabyMinus>
                                            <GuestSettingInput value={search.baby} readOnly/>
                                            <GuestSettingBabyPlus onClick={onClickBabyPlus} $baby={search.baby}>
                                            <GuestSettingBabyPlusText $baby={search.baby}>+</GuestSettingBabyPlusText>
                                            </GuestSettingBabyPlus>
                                        </GuestSettingDiv>
                                    </GuestItem>
                                </BiggerDivSub2>
                            </ModalContentBigger2>
                                
                            
                        </ModalContainer>
                        <ModalFooter style={isModal ? {animation: "modalOpenAnimation 1s"} : {animation: "none"}}>
                            <FooterDelSpan onClick={onClickSearchReset}>전체 삭제</FooterDelSpan>
                            <FooterSearchBtn><WhiteSearchImg src={whiteSearchImg}/><SearchBtnSpan>검색</SearchBtnSpan></FooterSearchBtn>
                        </ModalFooter>        
                    </ModalOverlay>
                           
                </>


            }
            <Container>
                <SearchContainer onClick={onClickModal}>
                    <SearchImg src={searchImg}/>
                    <SearchDiv>
                        <SearchTitle>어디로 여행가세요?</SearchTitle>
                        <SearchSub>어디든지 • 언제든 • 게스트 추가</SearchSub>
                    </SearchDiv>
                </SearchContainer>
            </Container>
        </>
    )
}

export default Search;