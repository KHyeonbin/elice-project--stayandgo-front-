import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import MainPage from "./pages/MainPage"; 

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
