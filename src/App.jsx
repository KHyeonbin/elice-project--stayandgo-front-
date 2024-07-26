import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import WishPage from "./pages/WishPage";
import TravelPage from "./pages/TravelPage";
import ReservationPage from "./pages/ReservationPage";
import AboutPage from "./pages/AboutPage";
import PostUpload from "./pages/PostUpload";
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
          <Route path="/Travel" element={<TravelPage />}></Route>
          <Route path="/Reservation" element={<ReservationPage />}></Route>
          <Route path="/Profile" element={<ProfilePage />}></Route>
          <Route path="/Profile/Edit/:id" element={<ProfileEditPage />}></Route>
          <Route path="/MyAccommodation" element={<MyAccommodationsPage />}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/upload" element={<PostUpload />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
