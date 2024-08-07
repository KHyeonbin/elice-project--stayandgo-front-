import React from "react";
import SubLayout from "../components/layout/SubLayout";
import Login from "../components/account/Login";
import { motion } from "framer-motion";
import SubHeaderHome from "../components/layout/SubHeaderHome";

const LoginPage = () => {
  return (
    <>
      <SubHeaderHome />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        transition={{ duration: 0.3 }}
      >
        <SubLayout pageTitle="로그인">
          <Login />
        </SubLayout>
      </motion.div>
    </>
  );
};

export default LoginPage;