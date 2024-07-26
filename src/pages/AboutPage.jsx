import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import About from "../components/account/About";

const AboutPage = () => {
  // user 전역 상태 확인 및 변경
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);

  useEffect(() => {
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });
  }, [setLoginUser]);

  return (
    <>
      <Header user={loginUser} />
      <About />
      <Footer user={loginUser} />
    </>
  );
};

export default AboutPage;
