import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import About from "../components/account/About";

const AboutPage = () => {
  // user 전역 상태 확인 및 변경
  const loginUser = useRecoilValue(loginState);

  return (
    <>
      <Header user={loginUser} />
      <About />
      <Footer user={loginUser} />
    </>
  );
};

export default AboutPage;
