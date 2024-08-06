import React from "react";
import SubLayout from "../components/layout/SubLayout";
import SubHeader from "../components/layout/SubHeader";
import MainFooter from "../components/layout/MainFooter";
import ProfileEdit from "../components/profile/ProfileEdit";
import { motion } from "framer-motion";

const ProfileEditPage: React.FC = () => {
  return (
    <>
      <SubHeader />
      <motion.div
        initial={{ opacity: 0, transform: 'translateX(100%)'}}
        animate={{ opacity: 1, transform: 'translateX(0)'}}
        transition={{ duration: 0.3 }}>
          <SubLayout pageTitle="개인정보 수정">
            <ProfileEdit />
          </SubLayout>
      </motion.div>
      <MainFooter />
    </>
  );
};

export default ProfileEditPage;
