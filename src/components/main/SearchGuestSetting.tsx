import React from "react";
import styled from "styled-components";
import {AdultProps, BabyProps, ChildProps, SearchGuestSettingProps, SearchType} from '../../model/main(with detail, upload)/mainTypes';

const BiggerDivSub2 = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
const GuestSettingMinus = styled.div.attrs<AdultProps>(props => ({
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
const GuestSettingMinusText = styled.span.attrs<AdultProps>(props => ({
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
const GuestSettingPlus = styled(GuestSettingMinus).attrs<AdultProps>(props => ({
    style: {
        border: props.$adult === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingPlusText = styled(GuestSettingMinusText).attrs<AdultProps>(props => ({
    style: {
        color: props.$adult === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`
const GuestSettingChildMinus = styled.span.attrs<ChildProps>(props => ({
    style: {
        border: props.$child === 0 ? "1px solid #EBEBEB" : "1px solid #333",
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
const GuestSettingChildMinusText = styled.span.attrs<ChildProps>(props => ({
    style: {
        color: props.$child === 0 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 27px;
`
const GuestSettingChildPlus = styled(GuestSettingChildMinus).attrs<ChildProps>(props => ({
    style: {
        border: props.$child === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingChildPlusText = styled(GuestSettingChildMinusText).attrs<ChildProps>(props => ({
    style: {
        color: props.$child === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`
const GuestSettingBabyMinus = styled.span.attrs<BabyProps>(props => ({
    style: {
        border: props.$baby === 0 ? "1px solid #EBEBEB" : "1px solid #333",
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
const GuestSettingBabyMinusText = styled.span.attrs<BabyProps>(props => ({
    style: {
        color: props.$baby === 0 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 27px;
`
const GuestSettingBabyPlus = styled(GuestSettingBabyMinus).attrs<BabyProps>(props => ({
    style: {
        border: props.$baby === 10 ? "1px solid #EBEBEB" : "1px solid #333",
    }
}))`
`
const GuestSettingBabyPlusText = styled(GuestSettingBabyMinusText).attrs<BabyProps>(props => ({
    style: {
        color: props.$baby === 10 ? "#EBEBEB" : "#333",
    }
}))`
    font-size: 22px;
`

const SearchGuestSetting: React.FC <SearchGuestSettingProps> = ({search, setSearch}) => {
    // adult minus 핸들러
    const onClickAdultMinus = () : void => {
        if(search.adult === 0){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.adult--;
            return newSearch;
        });
    };
    // adult plus 핸들러
    const onClickAdultPlus = () : void => {
        if(search.adult === 10){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.adult++;
            return newSearch;
        });
    };
    // child minus 핸들러
    const onClickChildMinus = () : void => {
        if(search.child === 0){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.child--;
            return newSearch;
        });
    };
    // child plus 핸들러
    const onClickChildPlus = () : void => {
        if(search.child === 5){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.child++;
            return newSearch;
        });
    };
    // baby minus 핸들러
    const onClickBabyMinus = () : void => {
        if(search.baby === 0){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.baby--;
            return newSearch;
        });
    };
    // baby plus 핸들러
    const onClickBabyPlus = () : void => {
        if(search.baby === 5){
            return;
        }
        setSearch((current) : SearchType => {
            const newSearch = {...current};
            newSearch.baby++;
            return newSearch;
        });
    };

    return (
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
    );
}


export default SearchGuestSetting;