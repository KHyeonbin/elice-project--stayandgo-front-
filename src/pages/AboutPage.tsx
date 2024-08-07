import React from "react";
import {  useRecoilValue } from "recoil";
import SubHeader from "../components/layout/SubHeader";
import MainFooter from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import About from "../components/profile/About";
import { motion } from "framer-motion";


const AboutPage: React.FC = () => {
  // user 전역 상태 확인 및 변경
  const loginUser = useRecoilValue(loginState);

  return (
    <>
      <SubHeader />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)'}}
        animate={{ opacity: 1, transform: 'translateX(0)'}}
        transition={{ duration: 0.3 }}>
          <About />
      </motion.div>
      <MainFooter />
    </>
  );
};

export default AboutPage;
