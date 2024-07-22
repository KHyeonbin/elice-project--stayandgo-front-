import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import loginState from "../atoms/loginState";
import { useSetRecoilState, useRecoilValue } from "recoil";

const MainPage = () => {
    const setLoginUser = useSetRecoilState(loginState);
    const loginUser = useRecoilValue(loginState);

    useEffect(() => {
        // server 에 getUser 요청 후 결과에 따라 값 부여 !
        // true
        setLoginUser({
            email: "gudrjsdn8825@naver.com",
            nickName: "건우",
            is_admin: false,
            is_logined: false
        });
        // false
        /*
        setLoginUser({
            email: "",
            nickName: "건우",
            is_admin: false,
            is_logined: false
        });
        */
    }, [])

    return (
        <Header user={loginUser} />

    )

}

export default MainPage;