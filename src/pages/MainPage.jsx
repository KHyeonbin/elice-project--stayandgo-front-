import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/MainHeader";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Search from "../components/main/Search";
import loginState from "../atoms/loginState";
import Category from "../components/main/Category";
import Footer from "../components/layout/MainFooter";
import Items from "../components/main/Items";
import styled from "styled-components";

const MainPage = ({search, setSearch, startSearch, setStartSearch}) => {
    // user 전역 상태(app.jsx 에서 체크됨) 확인 및 변경
    const loginUser = useRecoilValue(loginState);

    // main 페이지에서 모달 호출 상태 확인 및 변경
    const [isModal, setIsModal] = useState(false)

    // 검색 태그 category state
    const [category, setCategory] = useState("전체");

    // 페이지네이션 정의 (초기 1페이지만 지정함(perPage 수정은 server 에서 담당)
    const [page, setPage] = useState({
        page: 1,
        perPage: 6,
        total: 0,
        totalPage: 0,
    });

    return (
        <>
            <Header user={loginUser} isModal={isModal}/>
            <Search setPage={setPage} search={search} setSearch={setSearch} startSearch={startSearch} setStartSearch={setStartSearch} isModal={isModal} setIsModal={setIsModal}/>
            <Category setPage={setPage} setCategory={setCategory} />
            <Items page={page} setPage={setPage} startSearch={startSearch} category={category}/>
            <Footer user={loginUser}/>
        </>
    );
};

export default MainPage;
