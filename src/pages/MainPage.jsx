import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/MainHeader";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Search from "../components/main/Search";
import loginState from "../atoms/loginState";
import Category from "../components/main/Category";
import Footer from "../components/layout/MainFooter";
import Items from "../components/main/Items";


const MainPage = ({search, setSearch, startSearch, setStartSearch}) => {
    // user 전역 상태(app.jsx 에서 체크됨) 확인 및 변경
    const loginUser = useRecoilValue(loginState);

    // main 페이지에서 모달 호출 상태 확인 및 변경
    const [isModal, setIsModal] = useState(false)

    // 검색 태그 category state
    const [category, setCategory] = useState("전체");

    return (
        <>
            <Header user={loginUser} isModal={isModal}/>
            <Search search={search} setSearch={setSearch} setStartSearch={setStartSearch} isModal={isModal} setIsModal={setIsModal}/>
            <Category setCategory={setCategory} />
            <Items startSearch={startSearch} category={category}/>
            <Footer />
        </>
    );
};

export default MainPage;
