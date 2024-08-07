import React from "react";
import SubHeader from "../components/layout/SubHeader";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import MyAccommodations from "../components/myAccommodation/MyAccommodations";
import { motion } from "framer-motion";

const MyAccommodationsPage: React.FC = () => {
  return (
    <>
    <SubHeader />
      <motion.div
      initial={{ opacity: 0, position: 'relative', left: '100%' }}
      animate={{ opacity: 1, position: 'relative', left: '0' }}
      transition={{ duration: 0.3 }}
    >
      <SubLayout pageTitle="나의 숙소">
        <MyAccommodations />
      </SubLayout>
      </motion.div>
      <MainFooter />
    </>
  );
};

export default MyAccommodationsPage;
