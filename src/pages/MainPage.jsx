import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Search from "../components/main/Search";
import loginState from "../atoms/loginState";

const MainPage = () => {
    // user 전역 상태 확인 및 변경
    const setLoginUser = useSetRecoilState(loginState);
    const loginUser = useRecoilValue(loginState);

    // main 페이지에서 모달 호출 상태 확인 및 변경
    const [isModal, setIsModal] = useState(false)

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
            <Search isModal={isModal} setIsModal={setIsModal}/>
            
        </>
    )

}

export default MainPage;