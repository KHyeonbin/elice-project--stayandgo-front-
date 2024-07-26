import React from "react";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/MainFooter";
import MyAccommodations from "../components/myAccommodation/MyAccommodations";

const MyAccommodationsPage = () => {
  return (
    <>
      <SubLayout pageTitle="나의 숙소">
        <MyAccommodations />
      </SubLayout>
      <MainFooter />
    </>
  );
};

export default MyAccommodationsPage;
