import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WishPage from "./pages/WishPage";
import TravelPage from "./pages/TravelPage";
import ReservationPage from "./pages/ReservationPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import JoinEndPage from "./pages/JoinEndPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import PostUpload from "./pages/PostUpload";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import MyAccommodationsPage from "./pages/MyAccommodationsPage";
import MyAccReservePage from "./pages/MyAccReservePage";
import { loginUserCheck } from "./api/loginUserCheck";
import {useEffect, useState} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loginState from "./atoms/loginState";
import {getDateFormat} from './util/getDateFormat';



const App = () => {
  // user 로그인 상태 확인 및 변경 -> 새로고침을 하더라도 바로 유저의 정보를 프론트에서 쉽게 관리 가능
  const loginUser = useRecoilValue(loginState);
  const setLoginUser = useSetRecoilState(loginState);

  // 검색어 search state (실시간)
  const [search, setSearch] = useState({
    city: "전체",
    startDate: getDateFormat(new Date()),
    endDate: getDateFormat(new Date()),
    adult: 0,
    child: 0,
    baby: 0,
  });

  // 검색어 search state (검색 버튼 클릭 시)
  const [startSearch, setStartSearch] = useState({
      city: "전체",
      startDate: getDateFormat(new Date()),
      endDate: getDateFormat(new Date()),
      adult: 0,
      child: 0,
      baby: 0,
  });

  useEffect(() => {
    loginUserCheck()
    .then(res => {
        if(res && res.code === 200){
            setLoginUser((current) => {
                const newUser = {...current};
                newUser.email = res.data.email;
                newUser.is_admin = res.data.is_admin;
                newUser.is_logined = true;
                newUser.name = res.data.name;
                newUser.nickname = res.data.nickname;
                newUser.phone = res.data.phone;
                newUser.photo = res.data.photo;
                return newUser;
            });
            console.log(res.message);
        } else if(res && res.code === 411){
            setLoginUser((current) => {
              const newUser = {...current};
              newUser.name= '';
              newUser.nickname= '';
              newUser.email= '';
              newUser.phone= '';
              newUser.is_admin= false;
              newUser.is_logined= false;
              newUser.photo= '';
              return newUser;
          });
          console.log(res.message);
        }
      });
  }, []);

  console.log(loginUser);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage search={search} setSearch={setSearch} startSearch={startSearch} setStartSearch={setStartSearch} />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/findpassword" element={<FindPasswordPage />} />
          <Route path="/joinEnd" element={<JoinEndPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
          <Route path="/room/details/:id" element={<RoomDetailsPage />} />
          <Route path="/Wish" element={<WishPage />}></Route>
          <Route path="/Travel" element={<TravelPage />}></Route>
          <Route path="/Reservation" element={<ReservationPage />}></Route>
          <Route path="/Profile" element={<ProfilePage />}></Route>
          <Route path="/Profile/Edit/:id" element={<ProfileEditPage />}></Route>
          <Route path="/myaccommodation" element={<MyAccommodationsPage />}></Route>
          <Route path="/myaccreserve" element={<MyAccReservePage />}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/upload" element={<PostUpload />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
