// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import React, { useState } from "react";
import { GuardProvider } from "@authing/guard-react18";
import "@authing/guard-react/dist/esm/guard.min.css";
import RouterComponent from "./router";

import "./index.css";
import logo from "./logo.svg";

function Basics()  {
  const [calling, setCalling] = useState(false); //是否正在呼叫
  const isConnected = useIsConnected(); //存储App ID的状态
  const [appId, setAppId] = useState("");  //存储频道名的状态
  const [channel, setChannel] = useState("");  //存储token的转态
  const [token, setToken] = useState("");

  // 使用App ID,频道名和Token加入频道,是否加入频道取决于calling的状态
  useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
  //local user
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  //remote users
  const remoteUsers = useRemoteUsers();

  // const guard = new GuardFactory.Guard({
  //   // 你可以前往 Authing 控制台的本应用详情页查看你的 APP ID
  //   appId: "65015ead3a8ba1d4e74a33e8",
  //   // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
  //   host: 'https://livecx.authing.cn/oidc',
  // });

  // 挂载 Authing Guard
  // guard.start("#authing-guard-container");

  return (
    <GuardProvider
      appId="65015ead3a8ba1d4e74a33e8"
      host="https://livecx.authing.cn/oidc"
    >
       <RouterComponent>
      <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <img alt="agora-logo" className="logo" src={logo} />
            <input
              onChange={e => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={e => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={e => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic(a => !a)}>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
            <button className="btn" onClick={() => setCamera(a => !a)}>
              <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
            onClick={() => setCalling(a => !a)}
          >
            {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      )}
      </>

      </RouterComponent>
    </GuardProvider>

  );
};

export default Basics;