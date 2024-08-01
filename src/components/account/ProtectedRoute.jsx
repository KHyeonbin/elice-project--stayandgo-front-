import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLoginSelector } from "../../atoms/TokenAtom";
import { useRecoilValue } from "recoil";

const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
