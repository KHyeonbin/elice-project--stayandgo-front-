import React from "react";
import SubLayout from "../components/layout/SubLayout";
import FindId from "../components/account/FindId";

const FindIdPage = () => {
  return (
    <>
      <SubLayout pageTitle="아이디 찾기">
        <FindId />
      </SubLayout>
    </>
  );
};

export default FindIdPage;
