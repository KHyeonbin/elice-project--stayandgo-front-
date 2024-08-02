import React from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import MyAccommodations from "../components/myAccommodation/MyAccommodations";
import { motion } from "framer-motion";

const MyAccommodationsPage = () => {
  return (
    <>
      <SubLayout pageTitle="나의 숙소">
      <motion.div
      initial={{ opacity: 0, transform: 'translateX(100%)' }}
      animate={{ opacity: 1, transform: 'translateX(0)' }}
      transition={{ duration: 0.3 }}
    >
        <MyAccommodations />
      </motion.div>
      </SubLayout>
      <MainFooter />
    </>
  );
};

export default MyAccommodationsPage;
