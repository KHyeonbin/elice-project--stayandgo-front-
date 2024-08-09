import React from "react";
import SubHeader from "../components/layout/SubHeader";
import Details from "../components/room/Details";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../atoms/TokenAtom";
import { motion } from "framer-motion";

const RoomDetailsPage = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateX(100%)' }}
      animate={{ opacity: 1, transform: 'translateX(0)' }}
      transition={{ duration: 0.3 }}
    >
      <SubHeader isLogin={isLogin} />
      <Details />
    </motion.div>
  );
};

export default RoomDetailsPage;
