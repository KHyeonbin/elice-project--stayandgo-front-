import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import WishPage from "./pages/WishPage";
import HistoryPage from "./pages/HistoryPage";
import ReservationPage from "./pages/ReservationPage";
import PostUpload from './pages/PostUpload';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Wish" element={<WishPage />}></Route>
          <Route path="/History" element={<HistoryPage />}></Route>
          <Route path="/Reservation" element={<ReservationPage />}></Route>
          <Route path="/upload" element={<PostUpload />}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
