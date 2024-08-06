import React from "react";
import SubLayout from "../components/layout/SubLayout";
import JoinEnd from "../components/account/JoinEnd";
import { motion } from "framer-motion";
import SubHeader from "../components/layout/SubHeader";

const JoinEndPage: React.FC = () => {
  return (
    <>
      <SubHeader />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        transition={{ duration: 0.3 }}
        >
        <SubLayout pageTitle="회원가입 완료">
          <JoinEnd />
        </SubLayout>
      </motion.div>
    </>
  );
};

export default JoinEndPage;
