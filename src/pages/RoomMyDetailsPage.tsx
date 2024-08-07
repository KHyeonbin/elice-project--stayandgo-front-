import React from "react";
import SubHeader from "../components/layout/SubHeader";
import RoomMyDetails from "../components/room/MyDetails";
import { motion } from "framer-motion";

const RoomMyDetailsPage: React.FC = () => {
  return (
    <motion.div
    initial={{ opacity: 0, position: 'relative', left: '100%' }}
    animate={{ opacity: 1, position: 'relative', left: '0' }}
    transition={{ duration: 0.3 }}
    >
      <SubHeader />
      <RoomMyDetails />
    </motion.div>
  );
};

export default RoomMyDetailsPage;
