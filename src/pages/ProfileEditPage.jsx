import React from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import ProfileEdit from "../components/profile/ProfileEdit";

const ProfileEditPage = () => {
  return (
    <>
      <SubLayout pageTitle="개인정보 수정">
        <ProfileEdit />
      </SubLayout>
      <MainFooter />
    </>
  );
};

export default ProfileEditPage;
