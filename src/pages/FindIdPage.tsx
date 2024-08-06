import React from "react";
import SubLayout from "../components/layout/SubLayout";
import FindId from "../components/account/FindId";
import { motion } from "framer-motion";
import SubHeader from "../components/layout/SubHeader";

const FindIdPage: React.FC = () => {
  return (
    <>
      <SubHeader/>
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        transition={{ duration: 0.3 }}
      >
        <SubLayout pageTitle="아이디 찾기">
          <FindId />
        </SubLayout>
      </motion.div>
    </>
  );
};

export default FindIdPage;
