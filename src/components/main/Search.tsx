import React,{useState, useEffect} from "react";
import styled from "styled-components";
import searchImg from "../../assets/icons/search.png";
import whiteSearchImg from "../../assets/icons/white_search.png";
import closeImg from "../../assets/icons/close.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getDateFormat} from '../../util/getDateFormat';
import { getNextDate } from "../../util/getNextDate";
import {ko} from 'date-fns/locale';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { korCity } from "../../util/data/arrayStaticData";
import SearchGuestSetting from "./SearchGuestSetting";
import { getNextNextDate } from "../../util/getNextNextDate";
import { optionType, PageType, SearchProps, AdultProps, SearchType } from "../../model/main(with detail, upload)/mainTypes";
import styles from './DatePicker.module.css';
import classNames from 'classnames';

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
const SearchSub = styled.span.attrs<AdultProps>(props => ({
    style: {
        fontSize: props.$adult > 0 ? "13px" : "10px"
    }
}))`
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
    // 보은 반응형 요청
    max-width: 700px;
    
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
    border-radius: 20px;
    background-color: white;
    margin-top: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;
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
const StyledDatePicker = styled(DatePicker)`
    width: 200px;
  text-align: center;
  
  .react-datepicker__header {
    background-color: white;
    color: #E61E51;
    border: none;
    text-align: center;
  }

  .react-datepicker__day--selected {
    background-color: #E61E51;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #F07C8C;
  }

  .react-datepicker__current-month {
    color: #E61E51;
  }
`
// 인원 선택 부분 (searchGuestSetting.jsx)
const ModalContentBigger2 = styled(ModalContentBigger)`
    height: 45%;
`

const ModalFooter = styled.div`
    position: fixed;
    bottom: 0;
    // mainFooter height 60px
    padding-bottom: 60px;
    margin-top: 10px;
    width: 100%;
    height: 15%;
    background-color: white;

    // 보은 반응형 요청
    max-width: 700px;
    border-radius: 10px 10px 0 0;

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
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`
const FooterSearchBtn = styled.button`
    width: 30%;
    height: 45px;

    border: none;
    border-radius: 10px;
    background-color: #E61E51;
    transition: background-color 0.5s;
    cursor: pointer;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    &:hover{
        background-color: #F0586F;
    }

    @media (max-height: 800px) {
        height: 30px;
    }
`
const WhiteSearchImg = styled(SearchImg)`
    margin-left: 0;
`
const SearchBtnSpan = styled.span`
    font-size: 16px;
    color: white;
`
// react-select css
const selectCustom: StylesConfig = {
    option: (provided, state) => {
        let backgroundColor = 'white';
        let color = '#333';
        if(state.isSelected){
            backgroundColor = '#F0586F';
            color = 'white';
        } else if(state.isFocused){
            backgroundColor = '#F07C8C';
            color = 'white';
        }
    return {
      ...provided,
      backgroundColor,
      color,
      padding: 20,
      border: "none",
      fontSize: "16px"
    }},
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: 'none',
      width: "220px",
      fontSize: "16px"
    }),
    menu: (provided) => ({
      ...provided,
      border: "none",
      fontSize: "16px"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: "16px"
    }),
};


const Search : React.FC <SearchProps> = ({setPage, search, setSearch, startSearch, setStartSearch, isModal, setIsModal}) => {
    // 검색 초기 값 *(전체 삭제 클릭 시 해당 기본 값으로 모두 초기화됨)
    const defaultValue : SearchType  = {
        city: "전체",
        startDate: getDateFormat(getNextDate()),
        endDate: getDateFormat(getNextNextDate()),
        adult: 0,
        child: 0,
        baby: 0
    };
    const minDate = new Date(defaultValue.startDate);
    const maxDate = new Date('2025-12-30');
    // 지역 정의 배열 사용
    // react-select 에는 key 값이 없어서 미리 option 정의
    const option = korCity.map((v : string) : optionType => {
        return {value: v, label: v};
    });
    // react-select box value 설정하기 위함
    const [selectValue, setSelectValue] = useState<optionType | null>(option[0]);
    
    // 시작 날짜, 끝 날짜 state
    const [startDate, setStartDate] = useState<Date>(getNextDate());
    const [endDate, setEndDate] = useState<Date>(getNextNextDate());

    // 최종 검색한 검색 내용 출력 상태
    const [startSearchText, setStartSearchText] = useState<string>("어디든지 • 언제든 • 게스트 추가");
    const [startSearchTextPerson, setStartSearchPerson] = useState<string>("");

    // 시작 날짜, 끝 날짜 검색 데이터에 반영
    useEffect(() => {
        setSearch((current) : SearchType => {
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
            setSearch((current) : SearchType => {
                const newSearch = {...current};
                newSearch.adult++;
                return newSearch;
            });
        }
    },[search])

    // 검색 컴포넌트에 최종 검색어 출력
    useEffect(() => {
        if(startSearch.adult > 0){
            setStartSearchText(`${startSearch.city} • ${startSearch.startDate} ~ ${startSearch.endDate} •`);
            setStartSearchPerson(`어른: ${startSearch.adult} 명, 어린이: ${startSearch.child} 명, 유아: ${startSearch.baby} 명`);
        }
    },[startSearch])

    // 클릭 시 모달 활성화
    const onClickModal = () : void => {
        setIsModal(true);
    };
    // x 버튼 클릭 시 모달 비활성화
    const onClickModalClose = () => {
        setIsModal(false);
    };
    // 지역 셀렉트 박스 이벤트 핸들러
    const onChangeSelect = (e: SingleValue<{ value: string, label: string }> | null) => {
        if(e){
            setSearch((current) : SearchType => {
                const newSearch = {...current};
                newSearch.city = e.value;
                return newSearch;
            });
            // react-select value 설정
            setSelectValue(() : optionType | null => {
                const selectedOption = option.find(v => v.value === e.value) || null;
                return selectedOption;
            });
        }
    };

    // 전체 삭제 클릭 시 이벤트 핸들러
    const onClickSearchReset = () => {
        setSearch(defaultValue);
        setSelectValue(option[0]);
    };

    // 검색 시작
    const onClickStartSearch = () => {
        if(new Date(search.startDate) > new Date(search.endDate)){
            alert("시작 날짜가 끝 날짜보다 더 큽니다.");
            return;
        } else if (search.adult === 0){
            alert("성인 1명 이상 지정 후 조회 및 예약할 수 있습니다.");
            return;
        } else {
            setIsModal(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setStartSearch(search);
            setPage((current) : PageType => {
                const newPage = {...current};
                newPage.page = 1;
                return newPage;
            });
        }
    }

    return (
        <>
            {isModal &&
                <>
                    <ModalOverlay>
                        <ModalContainer style={isModal ? {animation: "modalOpenAnimation 1s"} : {animation: "none"}}>
                            <CloseDiv onClick={onClickModalClose}><CloseImg src={closeImg}/></CloseDiv>
                            <ModalContent>
                                <SearchImg src={searchImg} />
                                <Select styles={selectCustom} options={option} onChange={onChangeSelect} value={selectValue} />
                            </ModalContent>
                            <ModalContentBigger>
                                <ModalcontentBiggerTitle>여행 날짜는 언제인가요?</ModalcontentBiggerTitle>
                                <BiggerDivSub>
                                    <div>
                                        <DatePicker value={search.startDate} 
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={minDate} // minDate 이전 날짜 선택 불가
                                            maxDate={maxDate} // maxDate 이후 날짜 선택 불가
                                            selected={startDate}
                                            onChange={(date: Date) => setStartDate(date)}
                                            locale={ko}
                                            disabledKeyboardNavigation // 키보드 비활성화
                                            onFocus={e => e.target.blur()} // 키보드 비활성화
                                            className={classNames(
                                                styles.wrapper, // 전체 스타일을 적용
                                                styles.daySelected,     // 선택된 날짜 스타일
                                                styles.dayKeyboardSelected, // 키보드 선택 스타일
                                                styles.currentMonth,     // 현재 월 스타일
                                            )} 
                                            wrapperClassName={styles.wrapper} // 래퍼 스타일을 적용
                                            calendarClassName={classNames(styles.header)} // 날짜 선택기 헤더 스타일을 적용
                                        />
                                    </div>
                                        <BiggerDivSubTitle>~</BiggerDivSubTitle>
                                    <div>
                                        <DatePicker value={search.endDate} 
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={minDate} // minDate 이전 날짜 선택 불가
                                            maxDate={maxDate} // maxDate 이후 날짜 선택 불가
                                            selected={endDate}
                                            onChange={(date: Date) => setEndDate(date)}
                                            locale={ko}
                                            disabledKeyboardNavigation // 키보드 비활성화
                                            onFocus={e => e.target.blur()} // 포커스를 받을 때 자동으로 blur() 호출하여 키보드 비활성화
                                            className={classNames(
                                                styles.wrapper, // 전체 스타일을 적용
                                                styles.daySelected,     // 선택된 날짜 스타일
                                                styles.dayKeyboardSelected, // 키보드 선택 스타일
                                                styles.currentMonth,     // 현재 월 스타일
                                            )} 
                                            wrapperClassName={styles.wrapper} // 래퍼 스타일을 적용
                                            calendarClassName={classNames(styles.header)} // 날짜 선택기 헤더 스타일을 적용
                                        />
                                    </div>
                                </BiggerDivSub>
                            </ModalContentBigger>
                            <ModalContentBigger2>
                                <ModalcontentBiggerTitle>게스트는 누구인가요?</ModalcontentBiggerTitle>
                                <SearchGuestSetting search={search} setSearch={setSearch} />
                            </ModalContentBigger2>
                        </ModalContainer>
                        <ModalFooter style={isModal ? {animation: "modalOpenAnimation 1s"} : {animation: "none"}}>
                            <FooterDelSpan onClick={onClickSearchReset}>전체 삭제</FooterDelSpan>
                            <FooterSearchBtn onClick={onClickStartSearch}><WhiteSearchImg src={whiteSearchImg}/><SearchBtnSpan>검색</SearchBtnSpan></FooterSearchBtn>
                        </ModalFooter>        
                    </ModalOverlay>
                </>
            }
            <Container>
                <SearchContainer onClick={onClickModal}>
                    <SearchImg src={searchImg}/>
                    <SearchDiv>
                        <SearchTitle>어디로 여행가세요?</SearchTitle>
                        <SearchSub $adult={startSearch.adult}>
                            {startSearchText}
                            <br />
                            {startSearchTextPerson}
                        </SearchSub>
                    </SearchDiv>
                </SearchContainer>
            </Container>
        </>
    )
}

export default Search;