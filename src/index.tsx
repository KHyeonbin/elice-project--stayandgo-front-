import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById('root');

if(rootElement){
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </RecoilRoot>
  );
} else {
  console.log('root element 없음');
}



reportWebVitals();
