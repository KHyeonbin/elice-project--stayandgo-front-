import React from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import Profile from "../components/profile/Profile";
import { motion } from "framer-motion";

const ProfilePage = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, transform: 'translateX(-100%)'}}
      animate={{ opacity: 1, transform: 'translateX(0)'}}
      transition={{ duration: 0.3 }}>
        <SubLayout pageTitle="프로필">
          <Profile />
        </SubLayout>
    </motion.div>
    <MainFooter />
    </>
  );
};
export default ProfilePage;
