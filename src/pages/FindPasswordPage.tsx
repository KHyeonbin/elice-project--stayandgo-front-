import React from "react";
import SubLayout from "../components/layout/SubLayout";
import FindPassword from "../components/account/FindPassword";
import { motion } from "framer-motion";
import SubHeader from "../components/layout/SubHeader";

const FindPasswordpage: React.FC = () => {
  return (
    <>
      <SubHeader />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        transition={{ duration: 0.3 }}
      >
        <SubLayout pageTitle="비밀번호 찾기">
          <FindPassword />
        </SubLayout>
      </motion.div>
    </>
  );
};

export default FindPasswordpage;
