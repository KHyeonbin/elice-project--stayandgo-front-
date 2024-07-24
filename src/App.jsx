import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import WishPage from "./pages/WishPage";
import TravelPage from "./pages/TravelPage";
import ReservationPage from "./pages/ReservationPage";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Wish" element={<WishPage />}></Route>
          <Route path="/Travel" element={<TravelPage />}></Route>
          <Route path="/Reservation" element={<ReservationPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
