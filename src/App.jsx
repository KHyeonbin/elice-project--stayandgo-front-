import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' ></Route>

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
