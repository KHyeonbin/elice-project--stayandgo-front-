import React from "react";
import SubLayout from "../components/layout/SubLayout";
import Join from "../components/account/Join";

const JoinPage = () => {
  return (
    <>
      <SubLayout pageTitle="회원가입">
        <Join />
      </SubLayout>
    </>
  );
};

export default JoinPage;
