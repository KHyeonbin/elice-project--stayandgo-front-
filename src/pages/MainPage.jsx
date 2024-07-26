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


const MainPage = () => {
    // user 전역 상태(app.jsx 에서 체크됨) 확인 및 변경
    const loginUser = useRecoilValue(loginState);

    // main 페이지에서 모달 호출 상태 확인 및 변경
    const [isModal, setIsModal] = useState(false)

    // 검색어 search state (실시간)
    const [search, setSearch] = useState({
        city: "전체",
        startDate: getDateFormat(new Date()),
        endDate: getDateFormat(new Date()),
        adult: 0,
        child: 0,
        baby: 0,
    });

    // 검색어 search state (검색 버튼 클릭 시)
    const [startSearch, setStartSearch] = useState({
        city: "전체",
        startDate: getDateFormat(new Date()),
        endDate: getDateFormat(new Date()),
        adult: 0,
        child: 0,
        baby: 0,
    });

    // 검색 태그 category state
    const [category, setCategory] = useState("전체");

    return (
        <>
            <Header user={loginUser} isModal={isModal}/>
            <Search search={search} setSearch={setSearch} setStartSearch={setStartSearch} isModal={isModal} setIsModal={setIsModal}/>
            <Category setCategory={setCategory} />
            <Items startSearch={startSearch} category={category}/>
            <Footer user={loginUser} />
        </>
    );
};

export default MainPage;
