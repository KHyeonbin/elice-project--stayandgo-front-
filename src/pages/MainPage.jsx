import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/MainHeader";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Search from "../components/main/Search";
import loginState from "../atoms/loginState";
import {getDateFormat} from '../util/getDateFormat';
import Category from "../components/main/Category";
import Footer from "../components/layout/MainFooter";
import Items from "../components/main/Items";
import styled from "styled-components";


const MainPage = () => {
    // user 전역 상태 확인 및 변경
    const setLoginUser = useSetRecoilState(loginState);
    const loginUser = useRecoilValue(loginState);

    // main 페이지에서 모달 호출 상태 확인 및 변경
    const [isModal, setIsModal] = useState(false)

    // 검색어 search state
    const [search, setSearch] = useState({
        city: "지역을 선택하세요",
        startDate: getDateFormat(new Date()),
        endDate: getDateFormat(new Date()),
        adult: 0,
        child: 0,
        baby: 0,
        is_start: false
    });

    // 검색 태그 category state
    const [category, setCategory] = useState("all");

    useEffect(() => {
        // server 에 getUser 요청 후 결과에 따라 값 부여 !
        // true
        setLoginUser({
            email: "gudrjsdn8825@naver.com",
            nickName: "건우",
            is_admin: false,
            is_logined: true
        });
    }, [])

    return (
        <>
            <Header user={loginUser} isModal={isModal}/>
            <Search search={search} setSearch={setSearch} isModal={isModal} setIsModal={setIsModal}/>
            <Category setCategory={setCategory} />
            <Items search={search} category={category} setSearch={setSearch}/>
            <Footer user={loginUser} />
            
        </>
    );
};

export default MainPage;
