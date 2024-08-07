import React from "react";
import SubHeader from "../components/layout/SubHeader";
import Details from "../components/room/Details";
import { motion } from "framer-motion";

const RoomDetailsPage: React.FC = () => {
  // 싹싹이 끝나고 윈도우 스크롤 위로
  const handleAnimationComplete = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
    initial={{ opacity: 0, position: 'relative', left: '100%' }}
    animate={{ opacity: 1, position: 'relative', left: '0' }}
    transition={{ duration: 0.3 }}
    onAnimationComplete={handleAnimationComplete}
    >
    <SubHeader />
      <Details />
    </motion.div>
  );
};

export default RoomDetailsPage;
