import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import WishPage from "./pages/WishPage";
import HistoryPage from "./pages/HistoryPage";
import ReservationPage from "./pages/ReservationPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import MyAccommodationsPage from "./pages/MyAccommodationsPage";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Wish" element={<WishPage />}></Route>
          <Route path="/History" element={<HistoryPage />}></Route>
          <Route path="/Reservation" element={<ReservationPage />}></Route>
          <Route path="/Profile" element={<ProfilePage />}></Route>
          <Route path="/Profile/Edit" element={<ProfileEditPage />}></Route>
          <Route path="/MyAccommodation" element={<MyAccommodationsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
