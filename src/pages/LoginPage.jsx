import React from "react";
import SubLayout from "../components/layout/SubLayout";
import Login from "../components/account/Login";

const LoginPage = () => {
  return (
    <>
      <SubLayout pageTitle="로그인">
        <Login />
      </SubLayout>
    </>
  );
};

export default LoginPage;
