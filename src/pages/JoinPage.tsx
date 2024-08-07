import React from "react";
import SubLayout from "../components/layout/SubLayout";
import Join from "../components/account/Join";
import { motion } from "framer-motion";
import SubHeader from "../components/layout/SubHeader";

const JoinPage: React.FC = () => {
  return (
    <>
      <SubHeader />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        transition={{ duration: 0.3 }}
      >
        <SubLayout pageTitle="회원가입">
          <Join />
        </SubLayout>
      </motion.div>
    </>
    
  );
};

export default JoinPage;
