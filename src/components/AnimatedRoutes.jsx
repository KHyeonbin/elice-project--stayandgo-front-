import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../pages/MainPage";
import WishPage from "../pages/WishPage";
import TravelPage from "../pages/TravelPage";
import ReservationPage from "../pages/ReservationPage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import FindIdPage from "../pages/FindIdPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import JoinEndPage from "../pages/JoinEndPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import PostUpload from "../pages/PostUpload";
import ProfilePage from "../pages/ProfilePage";
import ProfileEditPage from "../pages/ProfileEditPage";
import MyAccommodationsPage from "../pages/MyAccommodationsPage";
import MyAccReservePage from "../pages/MyAccReservePage";
import RoomMyDetailsPage from '../pages/RoomMyDetailsPage';
import PostUploadEdit from "../pages/PostUploadEdit";
import AdminPage from "../components/admin/AdminPage";
import { AnimatePresence } from "framer-motion";
import ChatBotPage from "../pages/ChatBotPage";



const AnimatedRoutes = ({ search, setSearch, startSearch, setStartSearch }) => {
    const location = useLocation();

    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainPage search={search} setSearch={setSearch} startSearch={startSearch} setStartSearch={setStartSearch} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/findId" element={<FindIdPage />} />
                <Route path="/findpassword" element={<FindPasswordPage />} />
                <Route path="/joinEnd" element={<JoinEndPage />} />
                <Route path="/changePassword" element={<ChangePasswordPage />} />
                <Route path="/room/details/:id" element={<RoomDetailsPage />} />
                <Route path="/room/my/details/:id" element={<RoomMyDetailsPage />} />
                <Route path="/Wish" element={<WishPage />} />
                <Route path="/Travel" element={<TravelPage />} />
                <Route path="/Reservation" element={<ReservationPage />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/Profile/Edit/:id" element={<ProfileEditPage />} />
                <Route path="/myaccommodation" element={<MyAccommodationsPage />} />
                <Route path="/myaccreserve" element={<MyAccReservePage />} />
                <Route path="/About" element={<AboutPage />} />
                <Route path="/upload" element={<PostUpload />} />
                <Route path="/upload/edit" element={<PostUploadEdit />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/chatbot" element={<ChatBotPage />} />
            </Routes>
        </AnimatePresence>
    )
};

export default AnimatedRoutes;