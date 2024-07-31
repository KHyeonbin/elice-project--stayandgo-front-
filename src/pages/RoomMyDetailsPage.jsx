import React from "react";
import SubHeader from "../components/layout/SubHeader";
import RoomMyDetails from "../components/room/MyDetails";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../atoms/TokenAtom";

const RoomDetailsPage = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  return (
    <>
      <SubHeader isLogin={isLogin} />
      <RoomMyDetails />
    </>
  );
};

export default RoomDetailsPage;
