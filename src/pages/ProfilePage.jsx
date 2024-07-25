import React from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import Profile from "../components/profile/Profile";

const ProfilePage = () => {
  return (
    <>
      <SubLayout pageTitle="프로필">
        <Profile />
      </SubLayout>
      <MainFooter />
    </>
  );
};
export default ProfilePage;
