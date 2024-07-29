import React from "react";
import SubLayout from "../components/layout/SubLayout";
import FindPassword from "../components/account/FindPassword";

const FindPasswordpage = () => {
  return (
    <>
      <SubLayout pageTitle="비밀번호 찾기">
        <FindPassword />
      </SubLayout>
    </>
  );
};

export default FindPasswordpage;
