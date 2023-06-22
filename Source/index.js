import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, VideoProvider ,HistoryProvider,LikesProvider,WatchLaterProvider} from "./context/context";

// Call make Server
makeServer();

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <VideoProvider>
      <HistoryProvider>
        <WatchLaterProvider>
          <LikesProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LikesProvider>
        </WatchLaterProvider>
      </HistoryProvider>
    </VideoProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
