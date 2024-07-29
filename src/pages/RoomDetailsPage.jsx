import React from "react";
import SubHeader from "../components/layout/SubHeader";
import Details from "../components/room/Details";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../atoms/TokenAtom";

const RoomDetailsPage = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  return (
    <>
      <SubHeader isLogin={isLogin} />
      <Details />
    </>
  );
};

export default RoomDetailsPage;
