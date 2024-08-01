import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { loginUserCheck } from "./api/loginUserCheck";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loginState from "./atoms/loginState";
import { getDateFormat } from './util/getDateFormat';
import AnimatedRoutes from "./components/AnimatedRoutes";

const App = () => {
  const loginUser = useRecoilValue(loginState);
  const setLoginUser = useSetRecoilState(loginState);

  const [search, setSearch] = useState({
    city: "전체",
    startDate: getDateFormat(new Date()),
    endDate: getDateFormat(new Date()),
    adult: 0,
    child: 0,
    baby: 0,
  });

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
      <AnimatedRoutes search={search} setSearch={setSearch} startSearch={startSearch} setStartSearch={setStartSearch} />
    </BrowserRouter>
  );
};

export default App;
