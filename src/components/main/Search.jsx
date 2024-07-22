import React from "react";
import {useState} from "react";
import styled from "styled-components";
import searchImg from "../../assets/icons/search.png"

const Container = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #EEEEEE;
`
const SearchContainer = styled.div`
    width: 90%;
    height: 60px;
    border-color: #EEEEEE;
    border-radius: 100px;
    box-shadow: 0 0 10px 5px #EEEEEE;
    cursor: pointer;
    
    display: flex;
    align-items: center;
`
const SearchImg = styled.img`
    width: 25px;
    height: 25px;

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

const Search = () => {
    return (
        <Container>
            <SearchContainer>
                <SearchImg src={searchImg}/>
                <SearchDiv>
                    <SearchTitle>어디로 여행가세요?</SearchTitle>
                    <SearchSub>어디든지 • 언제든 • 게스트 추가</SearchSub>
                </SearchDiv>
            </SearchContainer>
        </Container>
    )
}

export default Search;