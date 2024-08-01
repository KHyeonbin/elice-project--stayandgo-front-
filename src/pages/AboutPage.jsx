import React from "react";
import {  useRecoilValue } from "recoil";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import About from "../components/account/About";
import { motion } from "framer-motion";


const AboutPage = () => {
  // user 전역 상태 확인 및 변경
  const loginUser = useRecoilValue(loginState);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)'}}
        animate={{ opacity: 1, transform: 'translateX(0)'}}
        transition={{ duration: 0.3 }}>
          <Header user={loginUser} />
          <About />
      </motion.div>
      <Footer user={loginUser} />
    </>
  );
};

export default AboutPage;
