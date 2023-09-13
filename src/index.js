// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React, { StrictMode }  from 'react';
import { createRoot } from "react-dom/client";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from "agora-rtc-react";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

root.render(
  <StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </StrictMode>
);


// reportWebVitals();
